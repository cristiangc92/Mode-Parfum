import {
  GET_PRODUCTS,
  GET_PRODUCT_ID,
  GET_ALL_BRAND,
  RESET_STATE_DETAIL,
  SET_FILTERS,
  RESET_STATE_FILTERS,
  FILTERS,
  // SET_FAV_PRODUCT,
  DELETE_FAV_PRODUCT,
  GET_PRODUCT_NAME,
  SET_CART_PRODUCT,
  DELETE_CART_PRODUCT,
  // SET_PRODUCT_PRICE,
  REMOVE_PRODUCT_CART,
  ADD_PRODUCT_AMOUNT,
  REMOVE_PRODUCT_AMOUNT,
  LOGIN_USER,
  AUTH_SWITCH,
  GET_FAVOURITES,
  LOGOUT_USER,
  GET_SUCCESS,
  GET_CART_DESMOUNT, 
  GET_USERS, 
  GET_PAYMENTS,
  GET_NOTES
} from "../actions/actions";

// ubication: {
//   pais: "",
//   provincia: "",
// },
const collator = new Intl.Collator("es");

const initialState = {
  products: [],
  detail: [],
  cart: localStorage.getItem("cartProducts")
    ? JSON.parse(localStorage.getItem("cartProducts"))
    : [],
  favourites: [],
  // productPrice: [],
  user: {}, 
  notes: [],
  allUsers: [], 
  payments: [],
  auth: false,
  filters: localStorage.getItem("filters")
    ? JSON.parse(localStorage.getItem("filters"))
    : {
        genero: "",
        familia: "",
        marca: "",
        precio: "",
      },
  generos: ["all", "femenino", "masculino", "unisex"],
  familias: [
    {
      id: 1,
      name: "Amaderada"
    },
    {
      id: 2,
      name: "Oriental"
    },
    {
      id: 3,
      name: "Floral Amaderada"
    },
    {
      id: 4,
      name: "Amaderada Chipre"
    },
    {
      id: 5,
      name: "olfativa Floral"
    },
    {
      id: 6,
      name: "olfativa Frutal"
    },
    {
      id: 7,
      name: "dulce"
    },
    {
      id: 8,
      name: "Calido y Picante"
    },
    {
      id: 9,
      name: "Olfativa Citrica Aromatica"
    },
    {
      id: 10,
      name: "Fougere Oriental"
    },
    {
      id: 11,
      name: "oriental floral"
    },
    {
      id: 12,
      name: "olfativa Almendrado"
    },
    {
      id: 13,
      name: "olfativa Oriental"
    },
    {
      id: 14,
      name: "olfativa Campestre"
    },
    {
      id: 15,
      name: "olfativa Citrica"
    },
    {
      id: 16,
      name: "olfativa dulce"
    },
    {
      id: 17,
      name: "Olfativa aromática"
    },
    {
      id: 18,
      name: "Fragancia Oriental"
    },
    {
      id: 19,
      name: "floral oriental"
    }
  ],
  brands: [],
  precios: ["asc", "desc"],
  success: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    // case USER_UBICATION:
    //   return {
    //     ...state,
    //     ubication: {
    //       pais: action.payload.pais,
    //       provincia: action.payload.provincia,
    //     },
    //   };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT_ID:
      return {
        ...state,
        detail: action.payload,
      };
    case GET_ALL_BRAND:
      return {
        ...state,
        brands: action.payload,
      };
    case GET_PRODUCT_NAME:
      return {
        ...state,
        products: action.payload,
      };
    case RESET_STATE_DETAIL:
      return {
        ...state,
        detail: [],
      };
    case SET_FILTERS:
      window.localStorage.setItem(
        "filters",
        JSON.stringify({
          ...state.filters,
          [action.payload.filter]: action.payload.value,
        })
      );
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.filter]: action.payload.value,
        },
      };
    case RESET_STATE_FILTERS:
      window.localStorage.setItem(
        "filters",
        JSON.stringify({
          genero: "",
          familia: "",
          marca: "",
          precio: "",
        })
      );
      return {
        ...state,
        filters: {
          genero: "",
          familia: "",
          marca: "",
          precio: "",
        },
      };
    case FILTERS:
      return {
        ...state,
        // productsFilters: action.payload,
        products: action.payload,
      };
    case DELETE_FAV_PRODUCT:
      return {
        ...state,
      };
    case SET_CART_PRODUCT:
      console.log(action.payload.price);
      const cartProduct = state.cart.filter(
        (product) =>
          product.name === action.payload.name &&
          product.price[1] === action.payload.price[1]
      );
      console.log(cartProduct);
      if (cartProduct.length) {
        state.cart.find(
          (product) => product.name === action.payload.name
        ).amount += 1;
        localStorage.removeItem("cartProducts");
        localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        return { ...state, cart: state.cart };
      } else {
        localStorage.setItem(
          "cartProducts",
          JSON.stringify([...state.cart, action.payload])
        );
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case DELETE_CART_PRODUCT:
      localStorage.removeItem("cartProducts");
      localStorage.setItem(
        "cartProducts",
        JSON.stringify(
          state.cart.filter(
            (product) =>
              product.name !== action.payload.name ||
              Number(product.price[0]) !== Number(action.payload.price[0])
          )
        )
      );
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            product.name !== action.payload.name ||
            Number(product.price[0]) !== Number(action.payload.price[0])
        ),
      };
    // case SET_PRODUCT_PRICE:
    //   return{
    //     ...state,
    //     productPrice: [...state.productPrice, action.payload]
    //   }
    case REMOVE_PRODUCT_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.name !== action.payload),
      };
    case ADD_PRODUCT_AMOUNT:
      let productAdd = state.cart.filter(
        (product) =>
          product.name === action.payload.name &&
          Number(product.price[0]) === Number(action.payload.price[0])
      );
      if (productAdd.length) {
        let amountProduct = state.cart.find(
          (product) =>
            product.name === action.payload.name &&
            Number(product.price[0]) === Number(action.payload.price[0])
        );
        amountProduct.amount += 1;
        localStorage.removeItem("cartProducts");
        localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        return { ...state, cart: state.cart };
      } else {
        localStorage.removeItem("cartProducts");
        localStorage.setItem(
          "cartProducts",
          JSON.stringify([...state.cart, action.payload])
        );
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case REMOVE_PRODUCT_AMOUNT:
      let productRemove = state.cart.filter(
        (product) =>
          product.name === action.payload.name &&
          Number(product.price[0]) === Number(action.payload.price[0])
      );
      if (productRemove.length) {
        let amountProduct = state.cart.find(
          (product) =>
            product.name === action.payload.name &&
            Number(product.price[0]) === Number(action.payload.price[0])
        );
        if (amountProduct.amount > 1) {
          amountProduct.amount -= 1;
          localStorage.removeItem("cartProducts");
          localStorage.setItem("cartProducts", JSON.stringify(state.cart));
        }
        return { ...state, cart: state.cart };
      } else {
        localStorage.removeItem("cartProducts");
        localStorage.setItem(
          "cartProducts",
          JSON.stringify([...state.cart, action.payload])
        );
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case LOGOUT_USER: {
      return {
        ...state,
        user: {},
        favourites: [],
      };
    }
    case AUTH_SWITCH: {
      return {
        ...state,
        auth: false,
      };
    }
    case GET_FAVOURITES: {
      return {
        ...state,
        favourites: action.payload,
      };
    }
    case LOGIN_USER: {
      return {
        ...state,
        user: JSON.parse(localStorage.getItem("loggedToken")),
      };
    }
    case DELETE_FAV_PRODUCT: {
      return {
        ...state,
        favourites: action.payload,
      };
    }
    case GET_SUCCESS: {
      return {
        ...state,
        success: action.payload,
      };
    }
    case GET_CART_DESMOUNT: {
      return {
        ...state,
        cart:[]
      }
    } 
    case GET_USERS: { 
      return { 
        ...state, 
        allUsers: action.payload
      }
    } 
    case GET_PAYMENTS: { 
      return { 
        ...state, 
        payments: action.payload
      }
    } 
    case GET_NOTES:{
      return{
        ...state,
        notes:action.payload
      }
    }
    case "POST_PASSWORD_RESET":
      return {
        ...state,
      };
    case "POST_NEW_PASSWORD":
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default rootReducer;
