import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import Card from "../Card/Card";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import service from "../../services/login";
import toast, { Toaster } from "react-hot-toast";
import "./FavPage.css";

import { getFavourites } from "../../redux/actions/actions";

function FavPage() {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites);
  const user = useSelector((state) => state.user);
  let favProduct = service.getFavourites();
  useEffect(() => {
    favProduct.then((response) => {
      window.localStorage.setItem("favoritos", JSON.stringify(response.flat()));
      let userToken = JSON.parse(window.localStorage.getItem("favoritos"));
      dispatch(getFavourites(userToken));
    });
  }, [dispatch, favourites]);

  return (
    <div>
      <NavBar />
      <div className="fav_container">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="cards">
          <h1 className="title_fav">💜 Tus Favoritos 💜</h1>
          {favourites.length ? (
            favourites.map((product) => (
              <Card
                img={product.img}
                name={product.name}
                price={product.price}
                stock={product.stock}
                key={product.id}
                idProduct={product.id}
              />
            ))
          ) : (
            <h1>No tenés perfumes favoritos.</h1>
          )}
        </div>
        <Link to={"/"} className="btn_volver_fav">
          Volver
        </Link>
        <br /> <br /> <br />
        <div className="vacio">
          <h1></h1>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default FavPage;
