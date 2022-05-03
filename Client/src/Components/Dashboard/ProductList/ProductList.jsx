import styles from "./productList.module.css";
/* import { FaUsers } from "react-icons/fa";
import { RiInkBottleLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs"; */
import {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import { getProducts} from "../../../redux/actions/actions"
import toast,{Toaster} from 'react-hot-toast';
import swal from "sweetalert";
import { Link/* , useNavigate */ } from "react-router-dom";

function ProductList() {
    const products = useSelector(state=> state.products)
    const [productEdit, setProductEdit]=useState(0) 
    const [datas, setDatas] = useState({
      name: "",
      idBrand: "",
      genre: "",
      type: "",
      idFamily: "",
      notes: "",
      price: [
        ["",""],
      ],
      img: ``,
      available: true,
      stock: [""],
    });
    const dispatch = useDispatch()
    /* const navigate = useNavigate()   */  
    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    function edit(id){
      setProductEdit(id)
      console.log(id)
    }
    function cancel(){
      setProductEdit(0)
      toast("Se canceló la edición")
    } 
    function handleOnChange(e){ 
      console.log(e.target.value)
      setDatas((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    } 
    function handleOnStock(e){ 
      let arr=datas.stock;
      arr[e.target.name]= parseInt(e.target.value);
      setDatas((prev) => {
        return {
          ...prev,
          stock:arr,
        };
      });
      console.log(datas)
    }
    function handleSubmit(e){
      e.preventDefault()
      toast.success("Se guardaron los cambios")
      setProductEdit(0)
    }
    function handleDelete(id){
      swal("¿Seguro que deseas Eliminar el producto?", {
        buttons: ["Cancelar", true],
      }).then(respuesta=> { 
          if(respuesta){ 
           //action eliminar producto
          }
      })  
    } 

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
            <h3 className={styles.title}>Productos</h3>
        </div>
      {products.map((data) => (
        productEdit === data.id?
        <form onSubmit={handleSubmit} key={data.id}>
          <div className={styles.card} >
          <div className={styles.container_img}><img className={styles.img} src={data.img} alt=""/></div>    
          <div className={styles.container_info}>
              <input value={datas.name} name="name" onChange={handleOnChange}></input>
          </div>
          <div className={styles.container_info}>
              <h4>{data.brand.name}</h4>
          </div>
          <div className={styles.container_info_number}>
              <input value={datas.stock[0]} name="stock" onChange={handleOnStock}></input>
          </div>
          <div className={styles.container_info_number}>
              {data.price.map((price)=><input key={price[0]} value={price[0].toLocaleString("es-AR")}></input>)}
          </div>
          <div className={styles.container_info_number}>
              {data.price.map((price)=><input key={price[0]} value={price[1].toLocaleString("es-AR")}></input>)}
          </div>
           {/* <div className={`${styles.container_info_button} ${styles.green}`}>
            <button >Guardar</button>
          </div>
          <div className={styles.container_info_button}>
            <button onClick={cancel}>Cancelar</button>
          </div> */}
          </div>
          <hr className={styles.hr} ></hr>
        </form>
        :
          <div key={data.id}>
          <div className={styles.card} >
          <Link to={`/details/${data.id}`}><div className={styles.container_img}><img  className={styles.img} src={data.img} alt=""/></div> </Link>   
          <div className={styles.container_info}>
              <h4>{data.name}</h4>
          </div>
          <div className={styles.container_info}>
              <h4>{data.brand.name}</h4>
          </div>
          <div className={styles.container_info_number}>
              <h4>Stock {data.stock[0]}</h4>
          </div>
          <div className={styles.container_info_number}>
              {data.price.map((price)=><h4 key={price[0]}>{price[0].toLocaleString("es-AR")}ml</h4>)}
          </div>
          <div className={styles.container_info_number}>
              {data.price.map((price)=><h4 key={price[0]}>${price[1].toLocaleString("es-AR")}</h4>)}
          </div>
          {/* <div className={`${styles.container_info_button} ${styles.green}`}>
            {data.price.map((price)=><button key={price[0]}>Editar</button>)}
          </div>
          <div className={styles.container_info_button}>
            {data.price.map((price)=><button key={price[0]}>Eliminar</button>)}
          </div> */}
           {/* <div className={`${styles.container_info_button} ${styles.green}`}>
            <button onClick={()=>edit(data.id)}>Editar</button>
          </div>
          <div className={styles.container_info_button}>
            <button onClick={()=>handleDelete(data.id)}>Eliminar</button>
          </div> */}
          </div>
          <hr className={styles.hr} ></hr>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
