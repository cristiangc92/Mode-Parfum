import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Card/Card.css";
import { BsHeart } from "react-icons/bs";
import { BsFillCartFill } from "react-icons/bs";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavProduct,
  getFavourites,
  deleteFavProduct,
  setCartProduct,
} from "../../redux/actions/actions.js";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import service from "../../services/login";

export default function Card({ name, price, img, idProduct, stock }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favourites = useSelector((state) => state.favourites);
  let token2 = JSON.parse(window.localStorage.getItem("loggedToken"));
  let favoritos = JSON.parse(window.localStorage.getItem("favoritos"));
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const amount = 1;
  const [currentPrice, setCurrentPrice] = useState(0);
  // let favProduct = service.getFavourites()

  function handleFav(idProduct) {
    service.create({ idProduct }).then((response) => console.log(response));
    service.getFavourites().then((response) => {
      window.localStorage.setItem("favoritos", JSON.stringify(response.flat()));
      let userToken = JSON.parse(window.localStorage.getItem("favoritos"));
      dispatch(getFavourites(userToken));
    });
    // let favoritos = JSON.parse(window.localStorage.getItem("favoritos"));
    // dispatch(getFavourites(favoritos));
    toast.success(`Añadiste ${name} a tus favoritos 💜`);
  }

  function handleDelete(name, idProduct) {
    swal({
      title: "Está Seguro?",
      text: `Estás por eliminar ${name} de tus favoritos`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(`Eliminaste ${name} de favoritos`, {
          icon: "success",
        });
        service
          .deleteFavourites({ idProduct })
          .then((response) => console.log(response));
        let favoritos = JSON.parse(window.localStorage.getItem("favoritos"));
        favoritos = favoritos.filter((e) => e.id !== idProduct);
        window.localStorage.setItem("favoritos", JSON.stringify(favoritos));
        dispatch(deleteFavProduct(favoritos));
        dispatch(getFavourites(favoritos));
      } else {
        swal(`${name} sigue en tus favoritos`);
      }
    });
  }

  function handleCart() {
    let carrito = cart.find(
      (e) => e.name === name && e.price[1] === price[currentPrice][1]
    );
    if (!carrito) {
      dispatch(
        setCartProduct({
          name,
          price: price[currentPrice],
          img,
          idProduct,
          amount,
          currentPrice,
        })
      );
      toast.success(`Añadiste ${name} a tu carrito 🛒`);
    } else {
      toast.success("Ya añadiste este producto al carrito");
    }
  }

  function handleNotLogin() {
    navigate("/SignIn");
    toast.error("Tenés que estar logueado para guardar en Favoritos.");
  }
  function setStateCurrentPrice(e) {
    setCurrentPrice(Number(e.target.name));
  }

  return (
    <div className="card">
      {/* <Toaster
        position="top-right"
        reverseOrder={false}
      />  */}
      <Link to={"/details/" + idProduct}>
        <img
          className="card_image"
          src={img}
          alt="img not found"
          width="170px"
          height="180px"
        />
      </Link>
      <div className="card_content">
        <h3 className="perfum_name">{name}</h3>
        {price.map((price, i) => {
          return (
            <button
              style={
                Number(currentPrice) !== i
                  ? { opacity: ".25" }
                  : { opacity: "1" }
              }
              onClick={(e) => setStateCurrentPrice(e)}
              name={Number(i)}
              className="btn_ml"
              key={i}
            >
              {`${price[0]}ml`}
            </button>
          );
        })}
        <h4 className="price">
          $ {price[currentPrice][1].toLocaleString("es-AR")}
        </h4>
        <div className="read_fav">
          {/* {cart.find((p) => p.id === id) ? (
            <button
              className="btn_cart"
              style={{ color: "#008000" }}
              
            >
              <BsFillCartFill className="icon_cart" />
            </button>
          ) : (
            
          )} */}
          {stock[currentPrice] === 0 ? (
            <p className="sinStock">SIN STOCK</p>
          ) : (
            <button className="btn_cart" onClick={handleCart}>
              <BsFillCartFill className="icon_cart" />
            </button>
          )}

          {!token2 ? (
            <button className="btn_fav" onClick={() => handleNotLogin()}>
              <BsHeart className="icon_fav" />
            </button>
          ) : favourites.find((p) => p.id === idProduct) ? (
            <button
              className="btn_fav"
              style={{ color: "red" }}
              onClick={() => handleDelete(name, idProduct)}
            >
              <BsHeart className="icon_fav" />
            </button>
          ) : (
            <button className="btn_fav" onClick={() => handleFav(idProduct)}>
              <BsHeart className="icon_fav" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
