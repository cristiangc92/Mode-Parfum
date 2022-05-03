//import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getSuccess } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cartDesmount } from "../../redux/actions/actions";
//import { useParams } from "react-router-dom";
import "./Success.css";

export default function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const success = useSelector((state) => state.success);
  const query = new URLSearchParams(useLocation().search);
  const payment_id = query.get("payment_id");

  useEffect(() => {
    dispatch(getSuccess(payment_id));
    return function () {
      dispatch(cartDesmount());
    };
  }, [dispatch]);

  function handleCart(e) {
    navigate("/");
  }

  console.log(success);

  return (
    <div className="success_container">
      <div className="success_title">
        <h1>Mode Parfum</h1>
        <h2>¡Tu compra fue exitosa!</h2>
      </div>
      <div className="super_div">
        <h3 className="operacion_success">
          Detalles de la operación efectuada:
        </h3>
        <div className="success_details">
          <h4>
            Usuario: <span>{success.name}</span>
          </h4>
          <h4>
            Email: <span>{success.email}</span>
          </h4>
          <h4>
            DNI: <span>{success.dni}</span>
          </h4>
          <h4>
            Tarjeta: <span>{success.card_name}</span>
          </h4>
          <h4>
            Tipo: <span>{success.card_type}</span>
          </h4>
        </div>
      </div>

      <div className="table_btn">
        <div>
          <table className="table_success">
            <tr>
              <td>Producto</td>
              <td>Nombre</td>
              <td>Cantidad</td>
              <td>Precio</td>
            </tr>
          </table>
        </div>
        <div>
          {success.items &&
            success.items.map((el) => {
              return (
                <div>
                  {/*<img src={el.picture_url} alt='img de producto' width='100px' height='100px'/>
                                <h4>{el.description}</h4>
                                <h4>{el.quantity}</h4>
                                <h4>{el.price}</h4>*/}
                  <table className="table_success">
                    <tr>
                      <td>
                        <img
                          src={el.picture_url}
                          alt="img de producto"
                          width="75px"
                          height="75px"
                        />
                      </td>
                      <td>
                        <h4>{el.description}</h4>
                      </td>
                      <td>
                        <h4 className="cantidad">{el.quantity}</h4>
                      </td>
                      <td>
                        <h4>{el.price}</h4>
                      </td>
                    </tr>
                  </table>
                </div>
              );
            })}
          <h4 className="total_envio">
            Total + Envío: ${" "}
            <span>{success.transaction_amount + success.shipping}</span>
          </h4>
        </div>
        <div className="btn_container">
          <button onClick={(e) => handleCart(e)} className="success_volver">
            Volver al Home
          </button>
        </div>
      </div>
    </div>
  );
}
