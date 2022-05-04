import styles from "./userList.module.css";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProducts, getUsers } from "../../../redux/actions/actions";
import swal from "sweetalert";
import toast,{Toaster} from 'react-hot-toast';
import { Link } from "react-router-dom";
 

function UserList() {
  const products = useSelector((state) => state.products);
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProducts()); 
  }, []);
  
  function handleDelete(id){
    swal("¿Seguro que deseas Eliminar el Usuario?", {
      buttons: ["Cancelar", true],
    }).then(respuesta=> { 
        if(respuesta){ 
         //action eliminar usuario
        }
    })  
  }
  function handlePermissions(id){
    swal("¿Seguro que deseas otorgar permisos de Administrador a este Usuario?", {
      buttons: ["Cancelar", true],
    }).then(respuesta=> { 
        if(respuesta){ 
          toast.success("Le dió permisos de Admin a este usuario!")
         //action hacer admin al usuario
        }
    })
  } 
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])
  console.log(allUsers)

  return (
    <div className={styles.container}>
      <Toaster
          position="top-right"
          reverseOrder={true}
          toastOptions={{
            style: {
              border: "solid 1px#6c7293",
              backgroundColor:"#000000cc",
              padding: '16px',
              color: '#fff',
            },
          }}
        /> 
      <div className={styles.columnHeader}>
        <h3 className={styles.title}>Usuarios</h3>
      </div>
      {allUsers && allUsers.map((data) => (
        <div key={data.id}>
          <div className={styles.card}>
            <div className={styles.container_data_user}>
              <div className={styles.cont_name}>
                <FaUserCircle className={styles.photo_user}></FaUserCircle>
                <div className={styles.container_info}>
                  <h4>{data.username}</h4>
                </div>
              </div>
              <div className={styles.container_select_favoritos}>
                <select>
                  <option>{`${data.favourites.length} Favoritos`}</option>
                  {data.favourites.map((favorito) => (
                    <option>
                      {
                        products.find((product) => product.id === favorito)
                          ?.name
                      }
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.container_select_favoritos}>
                {/* <select>
                  <option>{`${data.compras.length} Compras`}</option>
                  {data.compras.map((favorito) => (
                    <option>
                      {
                        products.find((product) => product.id === favorito)
                          ?.name
                      }
                    </option>
                  ))}
                </select> */}
              </div>
            </div>
            <div className={styles.container_admin_buttons}>
            <h3>{data.isAdmin ? `Admin` : `Usuario`}</h3>
            <div className={styles.cont_buttons}>

            <div className={`${styles.container_info_button} ${styles.green}`}>
              <button onClick={()=>handlePermissions(data.id)}>Dar permisos</button>
            </div>
            <div className={styles.container_info_button}>
              <button onClick={()=>handleDelete(data.id)}>Eliminar</button>
            </div>
            </div>
            </div>
          </div>
          <hr className={styles.hr}></hr>
        </div>
      ))}
    </div>
  );
}

export default UserList;
