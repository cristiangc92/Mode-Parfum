const mercadopago = require("mercadopago"); 
// Agrega credenciales
mercadopago.configure({
    access_token:
      "APP_USR-5816583834132762-040916-8d2fb925bd3a46afdff9171639461127-1103818355",
  });  
// SDK de Mercado Pago para Node.js 
const checkout = async(req, res) => { 
    try{ 
        const body = req.body;
        let preference = {
          items: [],
          back_urls: {
            success: "https://mode-parfum.vercel.app/success",
            failure: "https://mode-parfum.vercel.app/",
            pending: "https://mode-parfum.vercel.app/",
          },
      
          //notification_url: "https://6a49-181-199-153-221.ngrok.io/success",
          auto_return: "approved",
          //binary_mode: true,
          //notification_url: "http://localhost:3000",
          statement_descriptor: "MODE PARFUM",
          shipments: {
            cost: 1000,
            mode: "not_specified",
          },
            
        };
        //console.log('esto es success',preference.back_urls.success)
        if (Array.isArray(body.title)) {
          for (let i = 0; i < body.title.length; i++) {
            preference.items.push({
              title: "varios productos",
              description: body.description[i],
              picture_url: body.picture_url[i],
              unit_price: parseInt(body.price[i]),
              quantity: parseInt(body.quantity[i]),
            });
          }
        } else {
          preference.items.push({
            title: body.title,
            description: body.description,
            picture_url: body.picture_url,
            unit_price: parseInt(body.price),
            quantity: parseInt(body.quantity),
          });
        }
      
        mercadopago.preferences
          .create(preference)
          .then(function (response) {
            res.redirect(response.body.init_point);
          })
          .catch(function (error) {
            console.log(error);
          });      
    }catch(error){ 
        console.log(error)
    }
} 

module.exports = { 
    checkout
}