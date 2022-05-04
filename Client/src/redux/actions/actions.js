import axios from "axios";
import toast from "react-hot-toast";
// export const USER_UBICATION = "USER_UBICATION";
export const GET_PRODUCT_ID = "GET_PRODUCT_ID";
export const GET_ALL_BRAND = "GET_ALL_BRAND";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const RESET_STATE_DETAIL = "RESET_STATE_DETAIL";
export const SET_FILTERS = "SET_FILTERS";
export const RESET_STATE_FILTERS = "RESET_STATE_FILTERS";
export const FILTERS = "FILTERS";
export const SET_FAV_PRODUCT = "SET_FAV_PRODUCT";
export const DELETE_FAV_PRODUCT = "DELETE_FAV_PRODUCT";
export const SET_CART_PRODUCT = "SET_CART_PRODUCT";
export const DELETE_CART_PRODUCT = "DELETE_CART_PRODUCT";
export const GET_PRODUCT_NAME = "GET_PRODUCT_NAME";
// export const SET_PRODUCT_PRICE = "SET_PRODUCT_PRICE";
export const REMOVE_PRODUCT_CART = "REMOVE_PRODUCT_CART";
export const ADD_PRODUCT_AMOUNT = "ADD_PRODUCT_AMOUNT";
export const REMOVE_PRODUCT_AMOUNT = "REMOVE_PRODUCT_AMOUNT";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const AUTH_SWITCH = "AUTH_SWITCH";
export const GET_FAVOURITES = "GET_FAVOURITES";
export const GET_SUCCESS = "GET_SUCCESS";
export const GET_USERS = "GET_USERS";
export const GET_PAYMENTS = "GET_PAYMENTS";
export const GET_CART_DESMOUNT = "GET_CART_DESMOUNT";
export const GET_NOTES = "GET_NOTES";
export const POST_PRODUCT = "POST_PRODUCT";

export function cartDesmount() {
  return { type: GET_CART_DESMOUNT };
}

export function getNotes() {
  return async function (dispatch) {
    let json = await axios.get("/notes");
    return dispatch({
      type: "GET_NOTES",
      payload: json.data,
    });
  };
} 

export function createProduct(payload){ 
  return async function (dispatch) {
    await axios.post("/addProduct" , payload);
    return dispatch({
      type: "POST_PRODUCT"
    });
  };
}

export function getSuccess(payload) {
  return async function (dispatch) {
    let token2 = JSON.parse(window.localStorage.getItem("loggedToken"));
    try {
      console.log(token2.token)
      console.log(payload)
      const json = await axios.get("/success?payment_id=" + payload, {
        headers: {
          Authorization: `Bearer ${token2.token}`,
        },
      });
      // console.log('json',json)
      return dispatch({
        type: "GET_SUCCESS",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export function loginUser(payload) {
  return async function (dispatch) {
    try {
      let json = await axios.post("/login", payload);
      console.log(json.data);
      return dispatch({ type: "LOGIN_USER", info: json.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function logOut() {
  return { type: "LOGOUT_USER" };
}
export function login() {
  return { type: "LOGIN_USER" };
}

export function postPasswordReset(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "/passwordReset",
        payload
      );
      if(response.data.error){
        console.log("ESTO ES RESPONSE: ", response.data);
        return toast.error(response.data.error);
      }else{ 
        toast.success("Revisa tu casilla de mensajes en tu correo electronico.")
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function postNewPassword(payload) {
  console.log("PAYLOAD: ", payload);
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "/newPassword",
        payload
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

// export function userUbication(latitude, longitude) {
//   return function (dispatch) {
//   if (!("geolocation" in navigator)) {
//     console.log("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
//   }
//   const onUbicacionConcedida = ubicacion => {
//     return  axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}longitude=${longitude}&localityLanguage=es`)
//     .then((response)=>{
//       dispatch({ type: "USER_UBICATION", payload: {pais: response.data.localityInfo.administrative[0].isoName,
//         provincia:response.data.localityInfo.administrative[1].isoName
//       }})
//     })
//   }
//   const onErrorDeUbicacion = err => {
//     console.log("Error obteniendo ubicación: ", err);
//   }
//   const opcionesDeSolicitud = {
//       enableHighAccuracy: true, // Alta precisión
//       maximumAge: 0, // No queremos caché
//       timeout: 5000 // Esperar solo 5 segundos
//   };
//   navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
// };
// }

export function resetStateDetail() {
  return { type: "RESET_STATE_DETAIL" };
}

export function getProducts() {
  return async function (dispatch) {
    let json = await axios.get("/products");
    return dispatch({
      type: "GET_PRODUCTS",
      payload: json.data,
    });
  };
}

export function getProductId(id) {
  return async function (dispatch) {
    let json = await axios.get(`/filtradoId/${id}`);
    return dispatch({
      type: "GET_PRODUCT_ID",
      payload: json.data,
    });
  };
}

export function getProductsByName(name) {
  return async function (dispatch) {
    let json = await axios("/product?name=" + name);
    return dispatch({
      type: "GET_PRODUCT_NAME",
      payload: json.data,
    });
  };
}

export function getAllBrand() {
  return async function (dispatch) {
    let json = await axios("/marcas");
    return dispatch({
      type: "GET_ALL_BRAND",
      payload: json.data,
    });
  };
}

export function setFilters(filter, value) {
  return { type: "SET_FILTERS", payload: { filter, value } };
}

export function resetStateFilter() {
  return { type: "RESET_STATE_FILTERS" };
}

export function filters(URL) {
  return async function (dispatch) {
    let json = await axios.get(URL);
    return dispatch({
      type: "FILTERS",
      payload: json.data,
    });
  };
}

export function setFavProduct(payload) {
  return async function (dispatch) {
    await axios.post("/favourites", payload);
    return dispatch({
      type: "SET_FAV_PRODUCT",
      // payload: json.data
    });
  };
}

export function getFavourites(payload) {
  return {
    type: "GET_FAVOURITES",
    payload,
  };
}

export function deleteFavProduct(payload) {
  return {
    type: "DELETE_FAV_PRODUCT",
    payload,
  };
}

export function setCartProduct(payload) {
  return {
    type: "SET_CART_PRODUCT",
    payload: payload,
  };
}

export function RemoveProductCart(payload) {
  return {
    type: "REMOVE_PRODUCT_CART",
    payload: payload,
  };
}

export function deleteCartProduct(payload) {
  return {
    type: "DELETE_CART_PRODUCT",
    payload: payload,
  };
}

// export function setProductPrice(payload){
//   return{
//     type: "SET_PRODUCT_PRICE",
//     payload: payload
//   }
// }

export function addProductAmount(payload) {
  return {
    type: "ADD_PRODUCT_AMOUNT",
    payload: payload,
  };
}

export function removeProductAmount(payload) {
  return {
    type: "REMOVE_PRODUCT_AMOUNT",
    payload: payload,
  };
}

export function authSwitch() {
  return {
    type: "AUTH_SWITCH",
  };
}

export function getUsers() {
  return async function (dispatch) {
    const users = await axios.get("/allUsers");
    return dispatch({
      type: "GET_USERS",
      payload: users.data,
    });
  };
}

export function getAllPayments() {
  return async function (dispatch) {
    const payments = await axios.get("/allPayments");
    return dispatch({
      type: "GET_PAYMENTS",
      payload: payments.data,
    });
  };
}
