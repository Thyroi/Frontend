import axios from "axios"

export function getInfo(){
	return async function(){
		var info = await axios.get("/products/")
		return info.data
	}
}

export function getByName(payload){
    return async function(){
        var name = await axios.get(`/products?name=${payload}`)
        return name.data
    }    
}

export function getById(){
    return async function(){
        var id = await axios.get(`/products/${id}`)
        return id.data
    }
}

export function getByCatId(payload){
    return async function(){
        var catId = await axios.get(`/products/bycat?id=${payload}`)
        return catId.data
    } 
}

export function getByColId(payload){
    return async function(){
        var colId = await axios.get(`/products/bycol?id=${payload}`)
        return colId.data
    } 
}

export function getSelectorsCat(){
	return async function(){
		var selectorsCat = await axios.get("/selectors/categories")
		return selectorsCat.data
	}
}

export function getSelectorsCol(){
	return async function(){
		var selectorsCol = await axios.get("/selectors/collections")
		return selectorsCol.data
	}
}

export function addProduct(){
    return async function(){
        const add = await axios.post("products/add", payload)
        return "Producto creado con exito"
    }
}

export function addProduct(){
    return async function(){
        const update = await axios.put("products/update", payload)
        return "Producto actualizado con exito"
    }
}
