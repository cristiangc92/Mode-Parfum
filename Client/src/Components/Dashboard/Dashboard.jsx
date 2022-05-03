import styles from "./dashboard.module.css";
import logo from "../NavBar/Logo/logo.png";
import { FaUserCircle, FaUsers } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiSearch, FiLogOut } from "react-icons/fi";
import { FcSettings } from "react-icons/fc";
import { RiInkBottleLine } from "react-icons/ri";
import { useEffect, useState } from "react";
/* import Card from "./Card/Card"; */
import Cards from "./Cards/Cards";
import ProductList from "../Dashboard/ProductList/ProductList";
import UserList from "./userList/UserList";
import { Link } from "react-router-dom";
import Ranking from "./Ranking/Ranking";
import RankingUser from "./Ranking/RankingUser"
import CreateProduct from "./CreateProduct/CreateProduct";
import Estadisticas from "./userList/Estadisticas";

function Dashboard() {
  const [userMenu, setUserMenu] = useState(false);
  const [menuAside, setMenuAside] = useState(
    localStorage.getItem("menuAside")
      ? JSON.parse(localStorage.getItem("menuAside"))
      : {
          dashboard: true,
          btn1: false,
          btn2: false,
        }
  );
  const [menu, setMenu] = useState(
    localStorage.getItem("menu")
      ? JSON.parse(localStorage.getItem("menu"))
      : {
          dashboard: true,
          allUsers: false,
          createProduct: false,
          allProducts: false, 
          estadisticas: false
        }
  );
  let token = JSON.parse(window.localStorage.getItem("loggedToken"))

  useEffect(() => {
    window.localStorage.setItem("menuAside", JSON.stringify(menuAside));
    window.localStorage.setItem("menu", JSON.stringify(menu));
  }, [menuAside, menu]);

  function handleSettingUser() {
    setUserMenu(!userMenu);
  }
  function handleMenuAside(element, value) {
    if (element === "btn1") {
      handleMenu("allProducts", true);
    }
    if (element === "btn2") {
      handleMenu("allUsers", true);
    }
    if (element === "createProduct") {
      handleMenu("createProduct", true);
    }
    if (element === "dashboard") {
      handleMenu("dashboard", true);
    } 
    if (element === "estadisticas") {
      handleMenu("estadisticas", true);
    }
    setMenuAside(() => {
      return {
        dashboard: false,
        btn1: false,
        btn2: false,
        [element]: value,
      };
    });
  }



  function handleMenu(element, value) {
    setMenu(() => {
      return {
        dashboard: false,
        allUsers: false,
        allProducts: false,
        createProduct: false,
        estadisticas:false,
        [element]: value,
      };
    });
  }



  return (
    <div className={styles.body}>
      <div className={styles.nav}>
        <div className={styles.container_logo}>
          <Link to={"/"}>
            <img className={styles.logo} src={logo} alt="logo" />
          </Link>
        </div>
        {/* <form className={styles.container_search_bar}>
          <input type="text" placeholder="Burcar producto" />
          <button className={styles.button_search}>
            <FiSearch />
          </button>
        </form> */}
        <div onClick={handleSettingUser} className={styles.user_nav}>
          <FaUserCircle
            className={styles.photo_user}
            style={{ marginRight: "3px" }}
          ></FaUserCircle>
          <div>
            <h4 className={styles.name_user}>{token.username}</h4>
          </div>
          <MdKeyboardArrowDown
            className={styles.arrow_button}
          ></MdKeyboardArrowDown>
          <div
            className={`${styles.setting_user} ${
              userMenu && styles.setting_user_view
            }`}
          >
            <h3>Profile</h3>
            <hr></hr>
            <div className={styles.button_setting_user}>
              <div className={styles.icon_button}>
                <FcSettings />
              </div>
              <h4>Setting</h4>
            </div>
            <hr></hr>
            <div className={styles.button_setting_user}>
              <div className={styles.icon_button}>
                <FiLogOut />
              </div>
              <h4>Log out</h4>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.aside}>
          <div className={styles.user_aside}>
            <FaUserCircle className={styles.photo_user}></FaUserCircle>
            <div>
              <h4 className={styles.name_user}>{token.username}</h4>
              <h6 className={styles.name_rol}>Admin</h6>
            </div>
            <div className={styles.circle_online}></div>
          </div>
          <h2 className={styles.titulo_navigation}>Navigation</h2>
          <div className={styles.container_buttons}>
            <div
              onClick={() => handleMenuAside("dashboard", true)}
              className={
                menu.dashboard
                  ? styles.button_navigation_active
                  : styles.button_navigation
              }
            >
              <div className={styles.icon_name}>
                <div className={styles.icon_button}>
                  <RiInkBottleLine />
                </div>
                <h4 className={styles.name_button}>Dashboard</h4>
              </div>
              <div className={styles.arrow_button}></div>
            </div>
            <div
              onClick={() => handleMenuAside("btn1", !menuAside.btn1)}
              className={
                menuAside.btn1
                  ? styles.button_navigation_active
                  : styles.button_navigation
              }
            >
              <div className={styles.icon_name}>
                <div className={styles.icon_button}>
                  <RiInkBottleLine />
                </div>
                <h4 className={styles.name_button}>Productos</h4>
              </div>

              <MdKeyboardArrowDown
                className={styles.arrow_button}
              ></MdKeyboardArrowDown>
            </div>
            <div
              className={`${styles.menu_aside} ${
                menuAside.btn1 && styles.menu_aside_view
              }`}
            >
              {menu.allProducts ? (
                <button
                  onClick={() => handleMenu("allProducts", true)}
                  className={styles.button_options_menu_aside}
                  style={{ color: "#fff" }}
                >
                  Ver todos
                </button>
              ) : (
                <button
                  onClick={() => handleMenu("allProducts", true)}
                  className={styles.button_options_menu_aside}
                >
                  Ver todos
                </button>
              )}
              {menu.createProduct ? (
                <button
                  onClick={() => handleMenu("createProduct", true)}
                  style={{ color: "#fff" }}
                  className={styles.button_options_menu_aside}
                >
                  Agregar
                </button>
              ) : (
                <button
                  onClick={() => handleMenu("createProduct", true)}
                  className={styles.button_options_menu_aside}
                >
                  Agregar
                </button>
              )}  
              {menu.estadisticas ? (
                <button
                  onClick={() => handleMenu("estadisticas", true)}
                  style={{ color: "#fff" }}
                  className={styles.button_options_menu_aside}
                >
                  Estadisticas
                </button>
              ) : (
                <button
                  onClick={() => handleMenu("estadisticas", true)}
                  className={styles.button_options_menu_aside}
                >
                  Estadisticas
                </button>
              )}
              {/* <button  
                onClick={() => handleMenu("estadisticas", true)} 
                className={styles.button_options_menu_aside}>
                Estadisticas
              </button> */}

            </div>
            <div
              onClick={() => handleMenuAside("btn2", !menuAside.btn2)}
              className={
                menuAside.btn2
                  ? styles.button_navigation_active
                  : styles.button_navigation
              }
            >
              <div className={styles.icon_name}>
                <div className={styles.icon_button}>
                  <FaUsers />
                </div>
                <h4 className={styles.name_button}>Usuarios</h4>
              </div>
              <MdKeyboardArrowDown
                className={styles.arrow_button}
              ></MdKeyboardArrowDown>
            </div>
            <div
              className={`${styles.menu_aside} ${
                menuAside.btn2 && styles.menu_aside_view
              }`}
            >
              {menu.allUsers ? (
                <button
                  onClick={() => handleMenu("allUsers", true)}
                  className={styles.button_options_menu_aside}
                  style={{ color: "#fff" }}
                >
                  Registrados
                </button>
              ) : (
                <button
                  onClick={() => handleMenu("allUsers", true)}
                  className={styles.button_options_menu_aside}
                >
                  Registrados
                </button>
              )}

            </div>
          </div>
        </div>
        <div className={styles.workzone}>
          {/* <Card props={{title:"usuarios registrados",data:"3045",color: "#fff", icon:<FaUsers/>}}></Card> */}
          {/* <ProductList></ProductList> */}
          {/* <Cards></Cards> */}

          {menu.dashboard ? (
            <>
              <Cards></Cards>
              <Ranking data={{ title: "Productos mas vendidos" }}></Ranking>
              <RankingUser data={{ title: "Usuarios con mas compras" }}></RankingUser>
            </>
          ) : menu.allProducts ? (
            <ProductList></ProductList>
          ) : menu.allUsers ? (
            <UserList></UserList> 
          ) : (
            menu.createProduct ? (<CreateProduct></CreateProduct>
          ) : menu.estadisticas && <Estadisticas></Estadisticas> )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
