import { async } from "@firebase/util"
import axios from "axios"

export function getInfo(){
	return async function(dispatch){
		var info = await axios.get("http://localhost:3001/products/")
		return dispatch({
            type: "GET_ALL",
            payload: info.data
        })
	}
}

export function getByName(obj){
    return async function(dispatch){
        try{
        console.log(obj)
        var name = await axios.get(`http://localhost:3001/products?filters=${obj}`)
        return dispatch({
            type: "GET_BY_NAME",
            payload: name.data
        })}catch(error) {
            return dispatch({
                type: "GET_BY_NAME",
                payload: console.log("No products found")
            })
        }
    }    
}

export function getById(params){
    return async function(dispatch){
        var id = await axios.get(`http://localhost:3001/products/${params}`)
        return dispatch({
            type: "GET_BY_ID",
            payload: id.data
        })
    }
}

export function getSelectorsCat(){
	return async function(dispatch){
		var selectorsCat = await axios.get("http://localhost:3001/selectors/categories")
        var response = selectorsCat.data.data.map(p => {return {id: p.id_category, name: p.name}})
		return dispatch({
            type: "GET_SELECTOR_CAT",
            payload: response
        })
	}
}

export function getSelectorsCol(){
	return async function(dispatch){
		var selectorsCol = await axios.get("http://localhost:3001/selectors/collections")
        var response = selectorsCol.data.data.map(p => {return {id: p.id_collection, name: p.name}})
		return dispatch({
            type: "GET_SELECTOR_COL",
            payload: response
        })
	}
}

export function getByCatId(payload){
    return async function(dispatch){
        var catId = await axios.get(`http://localhost:3001/products/bycat?id=${payload}`)
        return dispatch({
            type: "GET_BY_CAT_ID",
            payload: catId.data.Products})
    } 
}

export function getByColId(payload){
    return async function(dispatch){
        var catId = await axios.get(`http://localhost:3001/products/bycol?id=${payload}`)
        return dispatch({
            type: "GET_BY_COL_ID",
            payload: catId.data})
    } 
}

export function getOffers(pay){
	return async function(dispatch){
		var info = await axios.get(`http://localhost:3001/products/byoffer?offer=${pay}`)
		return dispatch({
            type: "GET_OFFERS",
            payload: info.data.data
        })
	}
}

export function addProduct(payload){
    return async function(){
        const add = await axios.post("http://localhost:3001/products/add", payload)
        return alert("Producto creado con exito")
    }
}

export function getAllUsers() {
    return async function (dispatch) {
       const allusers = await axios.get("http://localhost:3001/users")
       return dispatch({
           type: 'GET_ALL_USERS',
            payload: allusers.data
       }) 
    }
}

export function updatePermission (payload) { 
    return async function (dispatch){
        const update =  await axios.put(`http://localhost:3001/users`, payload)
        console.log(update.data)
        return dispatch({
            type: 'UPDATE_PERMISSION',
            payload: update.data,
            
        }) 
    }
}

export const deleteUser = payload => async dispatch => {
    return await axios.delete(`http://localhost:3001/users`, {data: payload});
};

export const addCategory = payload => async dispatch => {
    return await axios.post(`http://localhost:3001/selectors/addCat`, payload);
}

export function addNewUser(payload) {
    return async function(){
        const add = await axios.post("http://localhost:3001/users", payload)
        
    }
} 