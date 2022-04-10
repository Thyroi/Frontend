import axios from 'axios';
import { Notifications } from '../utils/utils.js';

export function getInfo() {
	return async function (dispatch) {
		var info = await axios.get('http://localhost:3001/products/');
		return dispatch({
			type: 'GET_ALL',
			payload: info.data,
		});
	};
}

export function getSelectorsCol() {
	return async function (dispatch) {
		var selectorsCol = await axios.get(
			'http://localhost:3001/selectors/collections'
		);
		var response = selectorsCol.data.data.map((p) => {
			return { id: p.id_collection, name: p.name };
		});

		return dispatch({
			type: 'GET_SELECTOR_COL',
			payload: response,
		});
	};
}

export function getByName(obj) {
	return async function (dispatch) {
		try {
			var name = await axios.get(`http://localhost:3001/products/?filters=${obj}`);
			return dispatch({
				type: 'GET_BY_NAME',
				payload: name.data,
			});
		} catch (error) {
			return dispatch({
				type: 'GET_BY_NAME',
				payload: name.data,
			});
		}
	};
}

export function getById(params) {
	return async function (dispatch) {
		var id = await axios.get(`http://localhost:3001/products/${params}`);

    id.data.variants.forEach((variant) => {
      variant.ProductImages.shift();
    });

		return dispatch({
			type: 'GET_BY_ID',
			payload: id.data,
		});
	};
}

export function getSelectorsCat() {
	return async function (dispatch) {
		const { data } = await axios.get(
			'http://localhost:3001/selectors/categories'
		);

		const menArr = data?.men?.map((p) => {
			return { id: p.id_category, name: p.name };
		});

		const womenArr = data?.women?.map((p) => {
			return { id: p.id_category, name: p.name };
		});

		return dispatch({
			type: 'GET_SELECTOR_CAT',
			payload: { men: menArr, women: womenArr },
		});
	};
}

export function getByCatId(payload) {
	return async function (dispatch) {
		var { data } = await axios.get(
			`http://localhost:3001/products/bycat`
		);

		const res = [];		
		data?.women?.forEach(cat => cat.id_category === parseInt(payload) && res.push(...cat.Products));
		data?.men?.forEach(cat => cat.id_category === parseInt(payload) && res.push(...cat.Products));
		
		return dispatch({
			type: 'GET_BY_CAT_ID',
			payload: res
		});
	};
}

export function cleanProducts() {
	return async function (dispatch) {
		return dispatch({
			type: 'CLEAR_PRODUCTS',
			payload: [],
		});
	};
}
export function getByColId(payload) {
	return async function (dispatch) {
		var { data } = await axios.get(
			`http://localhost:3001/products/bycol?id=${payload}`
		);

		const res = [];
		data?.women?.forEach((e) => {
			e?.Products?.forEach((e) => res?.push(e));
		});
		data.men.forEach((e) => {
			e?.Products?.forEach((e) => res?.push(e));
		});

		return dispatch({
			type: 'GET_BY_COL_ID',
			payload: res,
		});
	};
}

export function getOffers(pay) {
	return async function (dispatch) {
		var { data } = await axios.get(
			`http://localhost:3001/products/byoffer?offer=${pay}`
		);

		return dispatch({
			type: 'GET_OFFERS',
			payload: [...data.women, ...data.men],
		});
	};
}

export function addProduct(payload) {
	return async function () {
		const add = await axios.post(
			'http://localhost:3001/products/add',
			payload
		);
		return alert('Producto creado con exito');
	};
}

// Actions for Cart guest

export function addCart(cartProducts, payload, dispatch) {
	if (!cartProducts.some((p) => p.id_product == payload.id_product)) {
		if (localStorage.getItem('cart') != null) localStorage.removeItem('cart');
		cartProducts.unshift(payload);

		localStorage.setItem('cart', JSON.stringify(cartProducts));
		const cart = JSON.parse(localStorage.getItem('cart'));

		Notifications('Product added to cart');

		return dispatch({
			type: 'ADD_CART',
			payload: cart,
		});
	}

	Notifications('This product is already in your cart');
}

// export function addProduct(payload){
//     return async function(){
//         const add = await axios.post("http://localhost:3001/products/add", payload)
//         return alert("Producto creado con exito")
//     }
// }

export function getAllUsers() {
	return async function (dispatch) {
		const allusers = await axios.get('http://localhost:3001/users');
		return dispatch({
			type: 'GET_ALL_USERS',
			payload: allusers.data,
		});
	};
}

export function updatePermission(payload) {
	return async function (dispatch) {
		const update = await axios.put(`http://localhost:3001/users`, payload);
		return dispatch({
			type: 'UPDATE_PERMISSION',
			payload: update.data,
		});
	};
}

export const deleteUser = (payload) => async (dispatch) => {
	return await axios.delete(`http://localhost:3001/users`, { data: payload });
};

export const addCategory = (payload) => async (dispatch) => {
	return await axios.post(`http://localhost:3001/selectors/addCat`, payload);
};

export function addNewUser(payload) {
	return async function () {
		const add = await axios.post('http://localhost:3001/users', payload);
	};
}

export function removeCart(cartProducts, payload) {
	const newConstProducts = cartProducts.filter(
		(p) => p.id_product !== payload.id_product
	);

	window.localStorage.setItem('cart', JSON.stringify(newConstProducts));
	const cart = JSON.parse(window.localStorage.getItem('cart'));

	Notifications('Product removed from cart');
	return {
		type: 'REMOVE_CART',
		payload: cart,
	};
}

export function updatingCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart = cart.map((p) => {
    if(p.id_product === product.id_product){
      return product
    }
    
    return p;
  });
  
  localStorage.setItem('cart', JSON.stringify(cart));
	return {
		type: 'UPDATING_CART',
		payload: cart,
	};
}

export function addWishList(payload) {
	return {
		type: 'ADD_WISH_LIST',
		payload,
	};
}

export function removeWishList(payload) {
	return {
		type: 'REMOVE_WISH_LIST',
		payload,
	};
}

export function createClient(payload) {
	return async function () {
		return await axios.post('http://localhost:3001/client', payload);
	};
}

export function createClientGoogle(payload) {
	return {
		type: 'GET_GOOGLE_INFO',
		payload,
	};
}

// Actions for customize products

export function selectingProduct(payload) {
	return {
		type: 'SELECTING_PRODUCT',
		payload: payload,
	};
}

// Data for sending products
export function saveSendingData() {
	const labels = document.querySelectorAll('label');
	const data = {};

	labels.forEach((label) => {
		const property = label.id;
		const value = label.nextSibling.value;

		if (
			property === 'calle' ||
			property === 'numero' ||
			property === 'state' ||
			property === 'city' ||
			property === 'zip_code' ||
			property === 'others'
		) {
			data.address[property] = value;
			return;
		}

		data[property] = value;
	});

	localStorage.setItem('datosDeEnvio', JSON.stringify(data));
	const payload = JSON.parse(localStorage.getItem('datosDeEnvio'));
}
