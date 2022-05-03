import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProducts,
  getFavourites,
  login,
} from "../../redux/actions/actions.js";
import ReactPaginate from "react-paginate";
import { BsPerson } from "react-icons/bs";
// import service from '../../services/login'
import toast, { Toaster } from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";

import "./Home.css";
import Loading from "../Loading/Loading.jsx";

import styled from "styled-components";
import NavBar from "../NavBar/NavBar.jsx";
import Card from "../Card/Card";
import Footer from "../Footer/Footer.jsx";
import Filters from "../Filters/Filters.jsx";
import Message from "../Message/Message.jsx";

function Home() {
  const dispatch = useDispatch();
  let token2 = JSON.parse(window.localStorage.getItem("loggedToken"));
  const allProducts = useSelector((state) => state.products);
  const favourites = useSelector((state) => state.favourites);
  const user = useSelector((state) => state.user);
  const [pageNumber, setPageNumber] = useState(0);
  const perfumsPerPage = 10;
  const pagesVisited = pageNumber * perfumsPerPage;
  const displayPerfums = allProducts.slice(
    pagesVisited,
    pagesVisited + perfumsPerPage
  );
  const pageCount = Math.ceil(allProducts.length / perfumsPerPage);
  // let favoritos = JSON.parse(window.localStorage.getItem("favoritos"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    dispatch(getProducts())
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }, [dispatch]);

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <>
      <HomeContainer>
        <Filters></Filters>
        <NavBar />
        <Toaster position="top-center" reverseOrder={false} />
        {/* <Message></Message>  */}
        <div className="cards">
          {allProducts.length > 0 && !allProducts[0].hasOwnProperty("error") ? (
            displayPerfums.map((p) => {
              return (
                <Card
                  img={p.img}
                  name={p.name}
                  price={p.price}
                  idProduct={p.id}
                  stock={p.stock}
                  key={p.id}
                />
              );
            })
          ) : loading ? (
            <Loading />
          ) : (
            <div>
              <h1>No hay resultados para esta busqueda!</h1>
            </div>
          )}
        </div>
      </HomeContainer>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination_btn"}
          previousLinkClassName={"previous_btn"}
          nextLinkClassName={"next_btn"}
          disabledClassName={"pagination_disabled"}
          activeClassName={"pagination_active"}
        />
      </div>
      <div className="wpp_flotante">
        <a
          href="https://wa.me/+543855374571"
          target="_blank"
          className="btn-wsp"
        >
          <i className="icon-whatsapp">
            <FaWhatsapp size={45} />
          </i>
        </a>
      </div>
      <Footer />
    </>
  );
}

export default Home ;

const HomeContainer = styled.div`
  width: 100%;
  min-height: 90vh;
  z-index: -1;
`;
