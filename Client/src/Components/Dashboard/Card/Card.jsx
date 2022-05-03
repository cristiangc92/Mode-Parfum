import styles from "./card.module.css";

function Card({props}){
    const {title,data,color,icon} = props
    return(
        <div className={styles.container}>
            <h4>{title}</h4>
            <div className={styles.container_info}>
            <h1>{data}</h1>
            <div style={{color:color}} className={styles.icon}>
               {icon}
            </div>
            </div>
        </div>
        
    )

}

export default Card