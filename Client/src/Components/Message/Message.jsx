import { useNavigate } from "react-router-dom";
import styles from "./message.module.css";


function Message({type}) {
    const navigate = useNavigate()

    function redirect(){
        navigate("/");
    }

    if (type === "success") {
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <h1 className={styles.title}>Gracias por su compra!!</h1>
          <p className={styles.text}>
            En muy poco tiempo podrá disfrutar de su producto!!
          </p>
          <div className={styles.container_btn}>
            <button onClick={redirect} className={styles.btn}>Volver</button>
          </div>
        </div>
      </div>
    );
  } else if (type === "progress") {
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <h1 className={styles.title}>Transferencia pendiente</h1>
          <p className={styles.text}>
            Esto puede tardar hasta 24hs.
          </p>
          <div className={styles.container_btn}>
            <button onClick={redirect} className={styles.btn}>Volver</button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.modal}>
          <h1 className={styles.title}>Ocurrió un error</h1>
          <p className={styles.text}>
            Ha ocurrido un error en la transferencia. Intente nuevamente en unos minutos
          </p>
          <div className={styles.container_btn}>
            <button onClick={redirect} className={styles.btn}>Volver</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
