const { Users, Payments, Products } = require("../db"); 
//NODEMAILER
var NODEMAILER = require("nodemailer");
const { default: axios } = require("axios");
const jwt = require("jsonwebtoken")

var confirmMail = async (username) => {
  var transporter = NODEMAILER.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_ADMIN,
      pass: process.env.PASSWORD,
    },
  });
  var mailOptions = {
    from: process.env.USER_ADMIN,
    to: username,
    subject: "Gracias por tu compra!",
    text: "Hola, queremos informarte que tu transaccion se registro correctamente!. Estamos preparando tu pedido y te avisaremos por mail cuando sea despachado. Gracias por confiar en MODEPARFUM!",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).jsonp(req.body);
      console.log("Email enviado");
    }
  });
};
const successPayment = async(req,res) => {
    try{ 
        const id1 = req.query.payment_id;
        const infoApi = await axios.get(
          "https://api.mercadopago.com/v1/payments/" + id1,
          {
            headers: {
              Authorization:
                "Bearer  APP_USR-5816583834132762-040916-8d2fb925bd3a46afdff9171639461127-1103818355",
            },
          }
        );
      
        const authorization = req.get("authorization");
      
        let token = "";
        if (authorization && authorization.toLowerCase().startsWith("bearer")) {
          token = authorization.substring(7);
        }
      
        let decodedToken = {};
        try {
          decodedToken = jwt.verify(token, process.env.SECRET);
        } catch (e) {
          console.log(e);
        }
      
        if (!token || !decodedToken.id) {
          return res.status(401).json({ error: "token missing or invalid" });
        }
        let { id, username } = decodedToken;
      
        const infoTotal = {
          items: infoApi.data.additional_info.items?.map((item) => {
            return {
              description: item.description,
              quantity: item.quantity,
              price: item.unit_price,
              picture_url: item.picture_url,
            };
          }),
          money: infoApi.data.currency_id,
          name: infoApi.data.card.cardholder.name,
          dni: infoApi.data.card.cardholder.identification.number,
          date: infoApi.data.card.date_created,
          expiration_month: infoApi.data.card.expiration_month,
          expiration_year: infoApi.data.card.expiration_year,
          first_six_digits: infoApi.data.card.first_six_digits,
          last_four_digits: infoApi.data.card.last_four_digits,
          shipping: infoApi.data.shipping_amount,
          installments: infoApi.data.installments,
          operation_type: infoApi.data.operation_type,
          email: infoApi.data.payer.email,
          card_name: infoApi.data.payment_method_id,
          card_type: infoApi.data.payment_type_id,
          status: infoApi.data.status,
          status_detail: infoApi.data.status_detail,
          transaction_amount: infoApi.data.transaction_amount,
          installment_amount: infoApi.data.transaction_details.installment_amount,
          net_received_amount: infoApi.data.transaction_details.net_received_amount,
          total_paid_amount: infoApi.data.transaction_details.total_paid_amount,
        };
        if (infoTotal) {
          for (let i = 0; i < infoTotal.items.length; i++) {
            const aux = {
              description: infoTotal.items[i].description,
              quantity: infoTotal.items[i].quantity,
              price: infoTotal.items[i].price,
              picture: infoTotal.items[i].picture_url,
              money: infoTotal.money,
              name: infoTotal.name,
              dni: infoTotal.dni,
              // date: infoTotal.date,
              expiration_month: infoTotal.expiration_month,
              expiration_year: infoTotal.expiration_year,
              first_six_digits: infoTotal.first_six_digits,
              last_four_digits: infoTotal.last_four_digits,
              shipping: infoTotal.shipping,
              installments: infoTotal.installments,
              operation_type: infoTotal.operation_type,
              // email: "",
              card_name: infoTotal.card_name,
              card_type: infoTotal.card_type,
              status: infoTotal.status,
              status_detail: infoTotal.status_detail,
              transaction_amount: infoTotal.transaction_amount,
              installment_amount: infoTotal.installment_amount,
              net_received_amount: infoTotal.net_received_amount,
              total_paid_amount: infoTotal.total_paid_amount,
              idPayment: id,
            };
            await Payments.create(aux);
          }
          const products = await Products.findAll();
          for (let i = 0; i < infoTotal.items.length; i++) {
            for (let j = 0; j < products.length; j++) {
              const arry = infoTotal.items[i].description.split(" ");
              const ml = arry.pop();
              const name = arry.join(" ");
      
              if (products[j].name === name) {
                if (products[j].price[0][1] === parseInt(infoTotal.items[i].price)) {
                  let arr = products[j].stock;
                  arr[0] = arr[0] - parseInt(infoTotal.items[i].quantity);
                  if (arr[0] < 0) {
                    arr[0] = 0;
                  }
                  await Products.update(
                    {
                      stock: arr,
                    },
                    { where: { name: name } }
                  );
                } else {
                  let arr2 = products[j].stock;
                  arr2[1] = arr2[1] - parseInt(infoTotal.items[i].quantity);
                  if (arr2[1] < 0) {
                    arr2[1] = 0;
                  }
                  await Products.update(
                    {
                      stock: arr2,
                    },
                    { where: { name: name } }
                  );
                }
              }
            }
          }
      
          const user = await Users.findOne({where:{id: id}})  
          const paymentUser = await Payments.findAll({ 
            where: { 
              idPayment: id
            }
          }) 
          let count = paymentUser.map(e=> e.toJSON())
          let userData = user.toJSON()
          let count2 = count.map(e=> e.quantity) 
          console.log(count2) 
          let count3 = count2.reduce((previous , current) => previous + current , 0)
          console.log(userData.payment)
          await Users.update(
            {
              payment: count3,
            },
            { where: { id: id } }
          );
      
          res.status(200).json(infoTotal);
          confirmMail(username);
        } else {
          res.status(404).json({ error: "No se pudo obtener la informacion" });
        }
    }catch(e){
        console.log(e)
    }
}
//exportamos la funcion para usarla en routes.
module.exports = {
    successPayment
}
