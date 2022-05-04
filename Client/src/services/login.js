import axios from 'axios'

const login = async credentials => { 
    console.log(credentials)
    const {data} = await axios.post("/login" , credentials)
    return data
} 

let token = null 
const setToken = newToken => { 
    token = `Bearer ${newToken}`
}
let token2 = JSON.parse(window.localStorage.getItem("loggedToken"))

const create = (newObject) => { 
    const config = { 
        headers: { 
            Authorization: token === null ? `Bearer ${token2.token}` : token
        }
    }

    const request = axios.post("/favourites" , newObject , config)
    return request.then(response => response.data)
}

const getFavourites = () => { 
    const config = { 
        headers: { 
            Authorization: token === null ? `Bearer ${token2.token}` : token
        }
    }
    const request = axios.post("/favouritesId" , null , config) 
    return request.then(response => response.data)
}

const deleteFavourites = (idProduct) => { 
    const config = { 
        headers: {
            Authorization: token === null ? `Bearer ${token2.token}` : token
        }
    }
    const request = axios.post("/deleteProduct" , idProduct , config) 
    return request.then(response => response.data)
}

export default { login , setToken , create , getFavourites , deleteFavourites}