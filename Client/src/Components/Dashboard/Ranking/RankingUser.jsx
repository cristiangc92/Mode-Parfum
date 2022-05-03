import { useSelector } from "react-redux";
import styles from "./ranking.module.css";

function RankingUser({ data }) {
  const products = useSelector((state) => state.allUsers);
  const { title } = data;
  products.sort((a, b) => {
    if (a.payment < b.payment) {
      return 1;
    }
    if (a.payment > b.payment) {
      return -1;
    }
    return 0;
  }) 

  console.log(products)
  if(products.length > 0){
    return (
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.title}>{title}</h1>
            <hr className={styles.hr}></hr>
            <div className={styles.container_info}>
              <div className={styles.number}>#1</div>
              <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFqZMMWnIwg5s5uicldr-MVKpmu_2e1KWaIm2wNzp-Oqs4uyaqRGY8TFhBHIdWOMFMYPs&usqp=CAU"} className={styles.img} alt=""></img>
              <h4 className={styles.name}>{products[0].username}</h4>
            </div>
            <hr className={styles.hr}></hr>
            <div className={styles.container_info}>
              <div className={styles.number}>#2</div>
              <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFqZMMWnIwg5s5uicldr-MVKpmu_2e1KWaIm2wNzp-Oqs4uyaqRGY8TFhBHIdWOMFMYPs&usqp=CAU"} className={styles.img} alt=""></img>
              <h4 className={styles.name}>{products[1]?.username}</h4>
            </div>
            <hr className={styles.hr}></hr>
            <div className={styles.container_info}>
              <div className={styles.number}>#3</div>
              <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFqZMMWnIwg5s5uicldr-MVKpmu_2e1KWaIm2wNzp-Oqs4uyaqRGY8TFhBHIdWOMFMYPs&usqp=CAU"} className={styles.img} alt=""></img>
              <h4 className={styles.name}>{products[2]?.username}</h4>
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

export default RankingUser;