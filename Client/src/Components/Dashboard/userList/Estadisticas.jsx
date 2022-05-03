import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPayments } from '../../../redux/actions/actions'; 
import { FaUserCircle, FaUsers } from "react-icons/fa";
import styles from './Estadisticas.module.css'

function Estadisticas() {
  const dispatch = useDispatch()
  const payment = useSelector(state => state.payments) 
  useEffect(() => {
    dispatch(getAllPayments())
  }, [dispatch])
  

 return (
  <div className={styles.container}>
      <div className={styles.columnHeader}>
        <h3 className={styles.title}>Usuarios</h3>
      </div>
      {payment && payment.map((data) => (
        <div key={data.id}>
          <div className={styles.card}>
            <div className={styles.container_data_user}>
              <div className={styles.cont_name}>
                <FaUserCircle className={styles.photo_user}></FaUserCircle>
                <div className={styles.container_info}>
                  <h4>{data.user.username}</h4>
                </div>
              </div>
              <div className={styles.container_select_favoritos}>
                <div className={styles.container_info}>
                    <h4>{data.description}</h4>
                  </div>
              </div>
            </div>
            <div className={styles.container_admin_buttons}>
                <h3>Cantidad: {data.quantity}</h3>
            <div className={styles.cont_buttons}>

             <div className={`${styles.container_info_button} ${styles.green}`}>
                <h4>Total: ${data.quantity * data.price}</h4>
            </div>
            {/* <div className={styles.container_info_button}>
              <button onClick={()=>handleDelete(data.id)}>Eliminar</button>
            </div> */}
            </div>
            </div>
          </div>
          <hr className={styles.hr}></hr>
        </div>
      ))}
    </div>
  );
}

export default Estadisticas