import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import styles from "./cards.module.css";
import { FaUsers } from "react-icons/fa";
import { RiInkBottleLine } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { getUsers, getAllPayments } from "../../../redux/actions/actions";

function Cards() {
  const usuarios = useSelector((state)=> state.allUsers);
  const pagos = useSelector(state=> state.payments);
  let suma = 0;
  pagos.forEach((e)=> suma += e.quantity)
  
  let cantidad = pagos.map(compras=>compras.quantity)
  let precio = pagos.map(compras=>compras.price) 
  let result = 0;
  for(var i=0; i<cantidad.length; i++){
    result += cantidad[i]*precio[i]; 
  }
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUsers())
    dispatch(getAllPayments())
  },[dispatch])
  
  const cards = [
    { title: "Usuarios Registrados", data: usuarios.length, color: "#6bdb0f", icon: <FaUsers /> },
    { title: "Pruductos Vendidos", data: suma, color: "#5368dd", icon: <RiInkBottleLine /> },
    { title: "Total Ventas", data: result, color: "#0ea59d", icon: <BsCashCoin /> },
  ];

  return (
    <div className={styles.container}>
      {cards.map((data) => (
        <Card key={data.id} props={data}></Card>
      ))}
    </div>
  );
}

export default Cards;