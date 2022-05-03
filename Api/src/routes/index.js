const { Router } = require("express");
const getProducts = require("./getProducts.routes");
const getProductsName = require("./getProductsName.routes");
const getNotes = require("./getNotes.routes");
// const filterGenero = require("./filterGenero.routes");
const getOrderByPrice1 = require("./getOrderByPrice1.routes");
const getOrderByPrice2 = require("./getOrderByPrice2.routes");
const getId = require("./getId.routes");
const getFilterByMarca = require("./getMarca.routes");
const filterMultiple = require("./filterMultiple.routes");
const getFamily = require("./getFamily.routes");
const getAllMarca = require("./getAllMarca.routes");
const { Users, Products, Payments } = require("../db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
// const bodyParser = require("body-parser"); //Invocamos a la librería body-parser
const axios = require("axios");

const router = Router();
//especificamos que ruta va a acceder la informacion de getProducts
router.use("/products", getProducts);
router.use("/product", getProductsName);
router.use("/notes", getNotes);
// router.use("/filter", filterGenero);
router.use("/orderByPrice1", getOrderByPrice1);
router.use("/orderByPrice2", getOrderByPrice2);
router.use("/filtradoId", getId);
router.use("/marca", getFilterByMarca);
router.use("/filterMultiple", filterMultiple);
router.use("/family", getFamily);
router.use("/marcas", getAllMarca);


// SDK de Mercado Pago
const mercadopago = require("mercadopago");
const { route } = require("./getProducts.routes");

//Middleware
// router.use(bodyParser.urlencoded({ extended: false }));

// Agrega credenciales
mercadopago.configure({
  access_token:
    "APP_USR-5816583834132762-040916-8d2fb925bd3a46afdff9171639461127-1103818355",
});

router.post("/checkout", (req, res) => {
  // Crea un objeto de preferencia
  const body = req.body;
  console.log(body);
  let preference = {
    items: [],
    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3001/failure-pending",
      pending: "http://localhost:3001/failure-pending",
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

  console.log(preference);
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.redirect(response.body.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

//PAGINA A DONDE SE REDIRECCIONA CUANDO EL PAGO ES APROBADO
router.get("/success", async (req, res) => {
  const id = req.query.payment_id;
  const infoApi = await axios.get(
    "https://api.mercadopago.com/v1/payments/" + id,
    {
      headers: {
        Authorization:
          "Bearer  APP_USR-5816583834132762-040916-8d2fb925bd3a46afdff9171639461127-1103818355",
      },
    }
  );

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
      };
      await Payments.create(aux);
    }
    res.status(200).json(infoTotal);
    confirmMail();
  } else {
    res.status(404).json({ error: "No se pudo obtener la informacion" });
  }
  // res.json({
  //   message: "Pago realizado con exito",
  //   Payment: req.query.payment_id,
  //   Site: req.query.site_id,
  //   Date: infoTotal.date,

  //   /////INFORMACION DE LOS PRODUCTOS/////
  //   Products: infoTotal.items,
  //   Money: infoTotal.money,
  //   Shipping: infoTotal.shipping,

  //   /////INFORMACION DE LA COMPRA/////
  //   Email: infoTotal.email,
  //   Status: infoTotal.status,
  //   Status_detail: infoTotal.status_detail,
  //   Operation_type: infoTotal.operation_type,
  //   Installment: infoTotal.installments,
  //   Installment_amount: infoTotal.installment_amount,
  //   Transaction_amount: infoTotal.transaction_amount,
  //   Total_paid_amount: infoTotal.total_paid_amount,
  //   Net_received_amount: infoTotal.net_received_amount,

  //   /////INFORMACION DE LA TARJETA/////
  //   Card_name: infoTotal.card_name,
  //   Card_type: infoTotal.card_type,
  //   First_Digits: infoTotal.first_six_digits,
  //   Last_Digits: infoTotal.last_four_digits,
  //   Expiration: {
  //     Month: infoTotal.expiration_month,
  //     Year: infoTotal.expiration_year,
  //   },
  //   Name: infoTotal.name,
  //   Dni: infoTotal.dni,
  // });
});

//PAGINA A DONDE SE REDIRECCIONA CUANDO EL PAGO FALLÓ O ESTA PENDIENTE
router.get("/failure-pending", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    Type: req.query.payment_type,
    Site: req.query.site_id,
  });
});

//NODEMAILER
var NODEMAILER = require("nodemailer");
//router.post("/send-email", (req, res) => {
//console.log("Send Email");
var confirmMail = async () => {
  var transporter = NODEMAILER.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    auth: {
      user: "info.modeparfum@gmail.com",
      pass: "modeparfum123",
    },
  });
  var mailOptions = {
    from: "info.modeparfum@gmail.com",
    to: "cristiangc92@gmail.com",
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

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("Yo , we need a token, please give it to us next time!");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, mesagge: "U failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findAll({ where: { username } });
    if (!user.length) {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log(err);
        }
        await Users.findOrCreate({
          where: {
            username,
            password: hash,
            favourites: [],
            isAdmin: false,
          },
        });
      });
      res.send("Usuario creado correctamente");
    } else {
      res
        .status(401)
        .json({ error: "Este usuario ya existe en la base de datos" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "invalid user or password" });
    }

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "invalid user or password" });
    }

    const userForToken = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.send({
      username: user.username,
      favourites: user.favourites,
      token,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/favourites", async (req, res) => {
  try {
    const { idProduct } = req.body;
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
    let { id } = decodedToken;
    console.log(id);
    const userId = await Users.findAll({
      where: {
        id: id,
      },
    });
    let arr = userId.map((e) => e.toJSON());
    arr[0].favourites.push(idProduct);
    function filterArray(favourites) {
      var found = {};
      var out = favourites.filter(function (element) {
        return found.hasOwnProperty(element) ? false : (found[element] = true);
      });
      return out;
    }
    await Users.update(
      {
        favourites: filterArray(arr[0].favourites),
      },
      { where: { id: id } }
    );
    res.send(userId);
  } catch (err) {
    console.log(err);
  }
});
router.post("/favouritesId", async (req, res) => {
  try {
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
    let { id } = decodedToken;
    const userId = await Users.findOne({
      where: {
        id: id,
      },
    });

    const products = await userId.dataValues.favourites.map(async (e) => {
      return await Products.findAll({ where: { id: e } });
    });
    const allProducts = await Promise.all(products);
    const favProducts = allProducts.map((e) => e.map((e) => e.dataValues));
    res.json(favProducts);
  } catch (err) {
    console.log(err);
  }
});

router.post("/deleteProduct", async (req, res) => {
  try {
    const { idProduct } = req.body;
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
    let { id } = decodedToken;
    const userId = await Users.findAll({
      where: {
        id: id,
      },
    });
    let arr = userId.map((e) => e.toJSON());
    arr[0].favourites = arr[0].favourites.filter((e) => e !== idProduct);
    console.log(arr[0].favourites);
    await Users.update(
      {
        favourites: arr[0].favourites,
      },
      { where: { id: id } }
    );
    res.send("Favorito eliminado");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

// ******************************************************************************
// USUARIOS TEST:
// VENDEDOR
// {
//     "id": 1103818355,
//     "nickname": "TETE3034221",
//     "password": "qatest8772",
//     "site_status": "active",
//     "email": "test_user_23426925@testuser.com"
// }
 
// COMPRADOR
// {
//     "id": 1103821005,
//     "nickname": "TEST13H7QYQT",
//     "password": "qatest2339",
//     "site_status": "active",
//     "email": "test_user_36306526@testuser.com"
// }

// ******************************************************************************

// Access Token USUARIO VENDEDOR
// APP_USR-5816583834132762-040916-8d2fb925bd3a46afdff9171639461127-1103818355

// ******************************************************************************
 