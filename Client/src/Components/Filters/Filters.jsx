import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filters,
  getAllBrand,
  getProducts,
  resetStateFilter,
  setFilters,
} from "../../redux/actions/actions";
import styles from "./Filters.module.css";

function Filter() {
  const dispatch = useDispatch();
  const [view_Filters, setView_filters] = useState(false);
  const [view_option_filters, setView_option_filters] = useState(false);
  const productsFilters = useSelector((state) => state.productsFilters);
  const generos = useSelector((state) => state.generos);
  const familias = useSelector((state) => state.familias);
  const marcas = useSelector((state) => state.brands);
  const precios = useSelector((state) => state.precios);
  const state_filters = useSelector((state) => state.filters);
  const { genero, familia, marca, precio } = useSelector(
    (state) => state.filters
  );
  const [filter, setFilter] = useState("Géneros");

    useEffect(()=>{
      dispatch(getAllBrand())
    },[])

  useEffect(() => {
    dispatch(
      filters(
        `/filterMultiple?genero=${genero}&marca=${marca}&price=${precio.toUpperCase()}`
      )
    );
  }, [genero, familia, marca, precio, filter]);
  function handleFilters(e) {
    setView_option_filters(false);
    console.log(e.target.id);
    console.log(e.target.name);

    if (e.target.id === "all") {
      dispatch(setFilters(e.target.name, ""));
      dispatch(getProducts());
    } else {
      dispatch(setFilters(e.target.name, e.target.id));
    }
  }
  function cleanFilters() {
    dispatch(resetStateFilter());
    dispatch(getProducts());
    setView_filters(false);
    setView_option_filters(false);
  }
  function setViewOpcionesFilter(e) {
    handleOptionFilters();
    setFilter(e.target.name);
    console.log(e.target.name);
  }
  function handleMenuFilters() {
    setView_option_filters(false);
    setView_filters(!view_Filters);
  }
  function handleOptionFilters() {
    setView_option_filters(true);
  }
  return (
    <div
      className={`${
        view_Filters ? styles.container_view : styles.container_hide
      }`}
    >
      <div className={styles.containerButtons}>
        <div className={styles.menu}>
          {state_filters.genero === "" ? (
            <button
              name={"Géneros"}
              onClick={(e) => setViewOpcionesFilter(e)}
              className={styles.filtros}
            >
              Género
            </button>
          ) : (
            <button
              name={"Géneros"}
              onClick={(e) => setViewOpcionesFilter(e)}
              className={styles.filtros}
              style={{ color: "#7c6dc3", backgroundColor: "aliceblue" }}
            >
              Género
            </button>
          )}

          {state_filters.marca === "" ? (
            <button
              name={"Marcas"}
              onClick={(e) => setViewOpcionesFilter(e)}
              className={styles.filtros}
            >
              Marca
            </button>
          ) : (
            <button
              style={{ color: "#7c6dc3", backgroundColor: "aliceblue" }}
              name={"Marcas"}
              onClick={(e) => setViewOpcionesFilter(e)}
              className={styles.filtros}
            >
              Marca
            </button>
          )}
          {/* <button
            name={"Familias"}
            onClick={(e) => setViewOpcionesFilter(e)}
            className={styles.filtros}
          >
            Familia
          </button> */}
          {state_filters.precio === "" ? (
            <button
              name={"Precio"}
              onClick={(e) => setViewOpcionesFilter(e)}
              className={styles.filtros}
            >
              Precio
            </button>
          ) : (
            <button
              name={"Precio"}
              onClick={(e) => setViewOpcionesFilter(e)}
              className={styles.filtros}
              style={{ color: "#7c6dc3", backgroundColor: "aliceblue" }}
            >
              Precio
            </button>
          )}
          <button onClick={cleanFilters} className={styles.filtros}>
            Limpiar filtros
          </button>
        </div>
        <div
          className={`${
            view_option_filters
              ? styles.container_opciones_view
              : styles.container_opciones_hide
          }`}
        >
          <div className={styles.opciones}>
            <h3 className={styles.tituloOpciones}>{filter}</h3>
            <div className={styles.containerOpcionesFiltro}>
              {filter === "Géneros"
                ? generos?.map((genero) =>
                    genero === state_filters.genero ? (
                      <button
                        style={{
                          filter: "drop-shadow(2px 5px 5px #89739b)",
                          color: "#222222",
                          backgroundColor: "#aaa",
                        }}
                        name={"genero"}
                        id={genero}
                        onClick={(e) => handleFilters(e)}
                        className={styles.opcionesFiltro}
                        key={genero}
                      >
                        {genero}
                      </button>
                    ) : (
                      <button
                        name={"genero"}
                        id={genero}
                        onClick={(e) => handleFilters(e)}
                        className={styles.opcionesFiltro}
                        key={genero}
                      >
                        {genero}
                      </button>
                    )
                  )
                : filter === "Marcas"
                ? marcas?.map((marca) =>
                    marca.name === state_filters.marca ? (
                      <button
                        style={{
                          filter: "drop-shadow(2px 5px 5px #89739b)",
                          color: "#222222",
                          backgroundColor: "#aaa",
                        }}
                        name={"marca"}
                        id={marca.name}
                        onClick={(e) => handleFilters(e)}
                        className={styles.opcionesFiltro}
                      >
                        {marca.name}
                      </button>
                    ) : (
                      <button
                        name={"marca"}
                        id={marca.name}
                        onClick={(e) => handleFilters(e)}
                        className={styles.opcionesFiltro}
                      >
                        {marca.name}
                      </button>
                    )
                  )
                : // filter === "Familias" &&
                  //   familias?.map((familia) => (
                  //     <button
                  //       name={"familia"}
                  //       id={familia}
                  //       onClick={(e) => handleFilters(e)}
                  //       className={styles.opcionesFiltro}
                  //     >
                  //       {familia}
                  //     </button>
                  //   ))
                  filter === "Precio" &&
                  precios?.map((precio) =>
                    precio === state_filters.precio ? (
                      <button
                        name={"precio"}
                        id={precio}
                        className={styles.opcionesFiltro}
                        onClick={(e) => handleFilters(e)}
                        style={{
                          filter: "drop-shadow(2px 5px 5px #89739b)",
                          color: "#222222",
                          backgroundColor: "#aaa",
                        }}
                      >
                        {precio}
                      </button>
                    ) : (
                      <button
                        name={"precio"}
                        id={precio}
                        className={styles.opcionesFiltro}
                        onClick={(e) => handleFilters(e)}
                      >
                        {precio}
                      </button>
                    )
                  )}
            </div>
          </div>
          <div
            onClick={handleMenuFilters}
            className={`${styles.btnView_menu} ${
              (state_filters.genero ||
                state_filters.marca ||
                state_filters.precio) &&
              styles.btnView_menu_active
            }`}
          >
            <span className={styles.btnViewFilters}>F</span>
            <span className={styles.btnViewFilters}>I</span>
            <span className={styles.btnViewFilters}>L</span>
            <span className={styles.btnViewFilters}>T</span>
            <span className={styles.btnViewFilters}>E</span>
            <span className={styles.btnViewFilters}>R</span>
            <span className={styles.btnViewFilters}>S</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Filter;
