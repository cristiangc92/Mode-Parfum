import styles from "./history.module.css";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../redux/actions/actions";
import { Link } from "react-router-dom";

function History() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <div className={styles.container}>
        <div className={styles.container_list}>
          <div className={styles.container_title}>
            <h4>Mis Compras</h4>
          </div>
          <div className={styles.columnNames}>
            <h4 style={{ width: "150px" }}></h4>
            <h4>Nombre</h4>
            <div className={styles.container_cantidad_precio}>
              <h4>Cantidad</h4>
              <h4>Total</h4>
            </div>
          </div>
          {products.map((product) => (
            <div className={styles.product}>
              <Link to={`/details/${product.id}`}>
                <img className={styles.img} src={product.img}></img>
              </Link>
              <Link to={`/details/${product.id}`}>
                <h4 className={styles.name}>{product.name}</h4>
              </Link>
              <div className={styles.container_numbers}>
                <Link to={`/details/${product.id}`}>
                  <h4>{product.stock[0]}</h4>
                </Link>
                <Link to={`/details/${product.id}`}>
                  <h4>${product.price[0][1].toLocaleString("es-AR")}</h4>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default History;