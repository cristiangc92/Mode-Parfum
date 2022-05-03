import React, { useState } from "react";
// import styled from 'styled-components'
import NavButton from "../NavButton/NavButton.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import logo from "./Logo/logo.png";
import { BsHandbag } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  NavContainer,
  BackGroundDiv,
  DropDown,
  Button_DropDown,
} from "./styles/styles";
import swal from "sweetalert";
import { logOut } from "../../redux/actions/actions.js";

function NavBar() {
  const [click, setClick] = useState(false);
  const [open, setOpne] = useState(false);
  const favourites = useSelector((state) => state.favourites);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [dropDown, setDropDown] = useState(false);
  let token2 = JSON.parse(window.localStorage.getItem("loggedToken"));
  let favoritos = JSON.parse(window.localStorage.getItem("favoritos"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick() {
    setClick(!click);
  }

  function handleClick() {
    setClick(!click);
  }

  function handleDropDown() {
    setDropDown(!dropDown);
  }

  const mostrarAlerta = () => {
    swal("¿Seguro que deseas cerrar sesión?", {
      buttons: ["NO", true],
    }).then((respuesta) => {
      if (respuesta) {
        dispatch(logOut());
        window.localStorage.removeItem("loggedToken");
        window.localStorage.removeItem("favoritos");
        navigate("/");
      }
    });
  };

  return (
    <>
      <NavContainer>
        <Link to="/">
          <img src={logo} alt="logo" width="250px" />
        </Link>

        <SearchBar />

        <div className={`nav-links-media ${click ? "active" : ""}`}>
          {token2 !== null ? (
            <>
              <BsPerson
                onClick={handleDropDown}
                className="person_icon_nav"
                style={{
                  color: "white",
                  backgroundColor: "rgb(136 115 155)",
                  borderRadius: "9999px",
                  padding: "5px",
                  fontSize: "1.5rem",
                  boxShadow: "rgb(0 0 0) 0px 0px 4px",
                }}
              />
              {dropDown && (
                <DropDown>
                  <span style={{ color: "white" }}>{token2.username}</span>
                  {token2.isAdmin && (<Button_DropDown onClick={() => navigate("/admin/dashboard")}>Panel admin</Button_DropDown>)}
                  <Button_DropDown onClick={mostrarAlerta}>
                    Cerrar sesión
                  </Button_DropDown>
                </DropDown>
              )}
            </>
          ) : (
            <Link to="SignIn" href="#">
              <BsPerson className="person_icon_nav_ahre" />
            </Link>
          )}
          {!token2 ? (
            <Link to="/SignIn">
              <BsHeart className="fav_nav" />
              <span className="span-cart">0</span>
            </Link>
          ) : (
            <Link to="/FavPage">
              <BsHeart className="fav_nav" />
              <span className="span-cart">{favourites.length}</span>
            </Link>
          )}

          <Link to="/Cart">
            <BsHandbag className="bag_nav" />
            <span className="span-cart">{cart.length}</span>
          </Link>
        </div>

        <div className="burger-media">
          <NavButton click={click} handleClick={handleClick} />
        </div>

        <BackGroundDiv className={`initial ${click ? "active" : ""}`} />
      </NavContainer>
    </>
  );
}

export default NavBar;
