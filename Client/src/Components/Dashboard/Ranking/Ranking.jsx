import { useSelector } from "react-redux";
import styles from "./ranking.module.css";

function Ranking({ data }) {
  const products = useSelector((state) => state.payments);
  const { title } = data;
  products.sort((a, b) => {
    if (a.quantity < b.quantity) {
      return 1;
    }
    if (a.quantity > b.quantity) {
      return -1;
    }
    return 0;
  })
  if(products.length > 0){
    console.log(products);
    return (
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.title}>{title}</h1>
            <hr className={styles.hr}></hr>
            <div className={styles.container_info}>
              <div className={styles.number}>#1</div>
              <img src={products[0]?.picture} className={styles.img} alt=""></img>
              <h4 className={styles.name}>{products[0]?.description}</h4>
            </div>
            <hr className={styles.hr}></hr>
            <div className={styles.container_info}>
              <div className={styles.number}>#2</div>
              <img src={products[1]?.picture} className={styles.img} alt=""></img>
              <h4 className={styles.name}>{products[1]?.description}</h4>
            </div>
            <hr className={styles.hr}></hr>
            <div className={styles.container_info}>
              <div className={styles.number}>#3</div>
              <img src={products[2]?.picture} className={styles.img} alt=""></img>
              <h4 className={styles.name}>{products[2]?.description}</h4>
            </div>
          </div>
        </div>
      );
  }
  else{
    return (
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.title}>{title}</h1>
            <hr className={styles.hr}></hr>
            <div className={styles.container_info}>
              <div className={styles.number}>#1</div>
            </div>
            <hr className={styles.hr}></hr>
            <div className={styles.container_info}>
              <div className={styles.number}>#2</div>
            </div>
            <hr className={styles.hr}></hr>
            <div className={styles.container_info}>
              <div className={styles.number}>#3</div>
            </div>
          </div>
        </div>
      );
  }
  
}

export default Ranking;
