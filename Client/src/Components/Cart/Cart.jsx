import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  // setCartProduct,
  getProducts,
  deleteCartProduct,
  addProductAmount,
  removeProductAmount,
} from "../../redux/actions/actions";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import swal from "sweetalert";
import toast, { Toaster } from "react-hot-toast";
import "./Cart.css";
import axios from "axios";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  let token2 = JSON.parse(window.localStorage.getItem("loggedToken"));
  const products = useSelector((state) => state.products);

  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(1);
  // getProducts;
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handlePrice = () => {
    let price = 0;
    cart.map(
      (product, i) => (price += Number(product.price[1] * product.amount))
    );
    setTotal(price);
  };

  const handleRemove = (data) => {
    swal({
      title: "Estás Seguro?",
      text: `Estás por eliminar este producto del carrito`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Eliminaste el producto.", {
          icon: "success",
        });
        dispatch(deleteCartProduct(data));
      } else {
      }
    });
  };

  // const handleSubmit = (e) => {
  //   e.prevenDefault()
  //   if(!token2){
  //     return toast.error("tienes que loguearte primero")
  //   }else{
  //     axios.post("http://localhost:3001/checkout")
  //   }

  // }
  // dispatch(deleteCartProduct(data));

  const handleAddProductAmount = (data) => {
    let arr = products.filter((e) => {
      if (e.name === data.name) {
        return e;
      }
    });
    let indexx = arr[0].price.findIndex((e) => e[1] === data.price[1]);
    const product = products.find((product) => product.name === data.name);
    const index = cart.find(
      (product) => product.name === data.name
    ).currentPrice;
    const cantidad = cart.find(
      (product) =>
        product.name === data.name &&
        parseInt(product.price[1]) === parseInt(data.price[1])
    ).amount;
    if (!(cantidad === arr[0].stock[indexx])) {
      dispatch(addProductAmount(data));
      setAmount(amount + 1);
    }
  };
  const handleRemoveProductAmount = (data) => {
    const cantidad = cart.find(
      (product) =>
        product.name === data.name &&
        parseInt(product.price[1]) === parseInt(data.price[1])
    ).amount;
    if (cantidad > 1) {
      dispatch(removeProductAmount(data));
      setAmount(amount - 1);
    }
  };
  useEffect(() => {
    handlePrice();
  });

  return (
    <div className="cart_container">
      <Toaster position="top-center" reverseOrder={false} />
      <NavBar />
      <br />
      <div className="vacio_cart">
        {/* <h1></h1> */}
      </div>
      <div className="volver_cart">
        <h1 className="title_fav">Tu Carrito 🛒</h1>
      </div>
      <article>
        {cart.map((item, i) => (
          <div className="cart_box" key={item.id}>
            <div className="cart_img">
              <img src={item.img} alt="" />
              <p>{item.name}</p>
              <span style={{ marginLeft: "10px" }}>
                {item.price && item.price[0]}ml
              </span>
            </div>
            <div>
              <button
                onClick={() =>
                  handleRemoveProductAmount({
                    name: item.name,
                    price: item.price,
                  })
                }
              >
                -
              </button>
              <button>
                {
                  cart.find(
                    (product) =>
                      product.name === item.name &&
                      product.currentPrice === item.currentPrice
                  ).amount
                }
              </button>
              <button
                onClick={() =>
                  handleAddProductAmount({ name: item.name, price: item.price })
                }
              >
                +
              </button>
            </div>
            <div>
              <span>
                ${item.price && item.price[1].toLocaleString("es-AR")}
              </span>
              <button
                onClick={() =>
                  handleRemove({ name: item.name, price: item.price })
                }
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        <div className="total">
          <form
            action="https://back-parfum.herokuapp.com/checkout"
            method="POST"
            className="form_mp"
          >
            <div className="precio_total">
              <span>Precio Total</span>
              <span>$ {total.toLocaleString("es-AR")}</span>
            </div>
            {cart.map((e, i) => (
              <div key={i}>
                <input
                  type="hidden"
                  name="title"
                  value={e.name + " " + e.price[0] + "ml"}
                />
                <input
                  type="hidden"
                  name="description"
                  value={e.name + " " + e.price[0] + "ml"}
                />
                <input type="hidden" name="picture_url" value={e.img} />
                <input type="hidden" name="price" value={e.price[1]} />
                <input type="hidden" name="quantity" value={e.amount} />
              </div>
            ))}
            {/* <input type="hidden" name="price" value={total} /> */}
            <div className="comprar_ahora">
              {!token2 ? (
                <button
                  type="button"
                  onClick={() =>
                    toast.error("Tenés que estar logueado para comprar.")
                  }
                  className="btn-error"
                >
                  Comprar ahora
                </button>
              ) : (
                <input
                  type="submit"
                  value="Comprar Ahora"
                  className="btn_comprar"
                />
              )}
            </div>
          </form>
        </div>
      </article>

      <div className="vacio_footer">
        {/* <h1></h1> */}
      </div>
      <div className="volver_cart">
        <Link to={"/"} className="btn_volver_cart">
          Seguir Comprando
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
