import axios from 'axios';
import { Notifications } from '../utils/utils.js';

export function getInfo() {
	return async function (dispatch) {
		try {
			var info = await axios.get('/products/');
			return dispatch({
				type: 'GET_ALL',
				payload: info.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getSelectorsCol() {
	return async function (dispatch) {
		try {
			var { data } = await axios.get('/selectors/collections');
			var response =
				typeof data?.data === 'string'
					? [{ id: 10, name: 'error loading collections' }]
					: data?.data?.map((p) => {
							return { id: p?.id_collection, name: p?.name };
					  });

			return dispatch({
				type: 'GET_SELECTOR_COL',
				payload: response,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getByName(obj) {
	return async function (dispatch) {
		try {
			var name = await axios.get(`/products/?filters=${obj}`);
			return dispatch({
				type: 'GET_BY_NAME',
				payload: name.data,
			});
		} catch (error) {
			return dispatch({
				type: 'RECOVER_PRODUCTS',
			});
		}
	};
}

export function getById(params) {
	return async function (dispatch) {
		try {
			var id = await axios.get(`/products/${params}`);

			id.data.variants.forEach((variant) => {
				variant.ProductImages.shift();
			});

			return dispatch({
				type: 'GET_BY_ID',
				payload: id.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getSelectorsCat() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get('/selectors/categories');

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
		} catch (error) {
			console.log(error);
		}
	};
}

export function getByCatId(payload) {
	return async function (dispatch) {
		try {
			var { data } = await axios.get(`/products/bycat`);

			const res = [];
			data?.women?.forEach(
				(cat) =>
					cat.id_category === parseInt(payload) &&
					res.push(...cat.Products)
			);
			data?.men?.forEach(
				(cat) =>
					cat.id_category === parseInt(payload) &&
					res.push(...cat.Products)
			);

			return dispatch({
				type: 'GET_BY_CAT_ID',
				payload: res,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function cleanProducts() {
	return async function (dispatch) {
		try {
			return dispatch({
				type: 'CLEAR_PRODUCTS',
				payload: [],
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function clearDetail() {
	return async function (dispatch) {
		try {
			return dispatch({
				type: 'CLEAR_DETAIL',
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function setActualPage(page) {
	return {
		type: 'SET_ACTUAL_PAGE',
		payload: page,
	};
}

export function getByColId(payload) {
	return async function (dispatch) {
		try {
			var { data } = await axios.get(`/products/bycol?id=${payload}`);

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
		} catch (error) {
			console.log(error);
		}
	};
}

export function getOffers(pay) {
	return async function (dispatch) {
		try {
			var { data } = await axios.get(`/products/byoffer?offer=${pay}`);

			return dispatch({
				type: 'GET_OFFERS',
				payload: [...data.women, ...data.men],
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function addProduct(payload) {
	return async function () {
		try {
			await axios.post('/products/add', payload);
			return alert('Producto creado con exito');
		} catch (error) {
			console.log(error);
		}
	};
}

export function getOrders() {
	return async function (dispatch) {
		try {
			var orders = await axios.get('/orders');
			return dispatch({
				type: 'GET_ORDERS',
				payload: orders.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function orderFilter(payload){
	return async function (dispatch) {
		try {
			const fil = await axios.get(`/orders?status=${payload}`);
			console.log(fil)
			return dispatch({
				type: 'ORDER_FILTER',
				payload: fil.data,
			})
		}catch (error) {
			console.log(error);
		}
	}
}
export function getOrdersById(id){
	return async function (dispatch) {
		try {
			var order = await axios.get(`/orders/${id}`);
			return dispatch({
				type: 'GET_ORDER_BY_ID',
				payload: order.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
export function UpdateOrder(id, payload) {
	return async function (dispatch) {
		try {
			const update = await axios.patch(`/orders/${id}`, payload);
			console.log(update + 'ok');
			return dispatch({
				type: 'UPDATE_ORDER',
				payload: update.data,
				
			});
		} catch (error) {
			console.log(error);
		}
	};
}
// Actions for Cart guest ************************************QUE HAGO CON LA DE ABAJO



export function addCart(cartProducts, payload, dispatch) {
	let cart = JSON.parse(localStorage.getItem('cart'));
	if (!cart) {
		localStorage.setItem('cart', JSON.stringify([]));
		cart = JSON.parse(localStorage.getItem('cart'));
	}

	if (cart.length === 0) {
		cart.unshift(payload);
		localStorage.setItem('cart', JSON.stringify(cart));

		return dispatch({
			type: 'ADD_CART',
			payload: cart,
		});
	}

	if (
		cart.some(
			(i) =>
				i.id_product === payload.id_product &&
				i.variants[0].ColorName === payload.variants[0].ColorName &&
				Object.keys(i.variants[0].Stocks)[0] ===
					Object.keys(payload.variants[0].Stocks)[0]
		)
	) {
		cart = cart.map((i) => {
			if (
				i.id_product === payload.id_product &&
				i.variants[0].ColorName === payload.variants[0].ColorName &&
				Object.keys(i.variants[0].Stocks)[0] ===
					Object.keys(payload.variants[0].Stocks)[0]
			) {
				i.variants[0].Stocks[
					Object.keys(payload.variants[0].Stocks)[0]
				] +=
					payload.variants[0].Stocks[
						Object.keys(payload.variants[0].Stocks)[0]
					];
				return i;
			}

			return i;
		});

		localStorage.setItem('cart', JSON.stringify(cart));
		return dispatch({
			type: 'ADD_CART',
			payload: cart,
		});
	}

	cart.unshift(payload);
	localStorage.setItem('cart', JSON.stringify(cart));

	return dispatch({
		type: 'ADD_CART',
		payload: cart,
	});
}

// export function addProduct(payload){
//     return async function(){
//         const add = await axios.post("/products/add", payload)
//         return alert("Producto creado con exito")
//     }
// }

export function getAllUsers() {
	return async function (dispatch) {
		try {
			const allusers = await axios.get('/users');
			return dispatch({
				type: 'GET_ALL_USERS',
				payload: allusers.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function updatePermission(payload) {
	return async function (dispatch) {
		try {
			const update = await axios.put(`/users`, payload);
			return dispatch({
				type: 'UPDATE_PERMISSION',
				payload: update.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export const deleteUser = (payload) => async (dispatch) => {
	try {
		return await axios.delete(`/users`, { data: payload });
	} catch (error) {
		console.log(error);
	}
};

export const addCategory = (payload) => async (dispatch) => {
	try {
		return await axios.post(`/selectors/addCat`, payload);
	} catch (error) {
		console.log(error);
	}
};

export function addNewUser(payload) {
	return async function () {
		try {
			await axios.post('/users', payload);
		} catch (error) {
			console.log(error);
		}
	};
}

//******************************* aca tambien x4

export function removeCart(cartProducts, payload) {
	let cart = JSON.parse(localStorage.getItem('cart'));

	if (
		cart.some(
			(i) =>
				i.id_product === payload.id_product &&
				i.variants[0].ColorName === payload.variants[0].ColorName &&
				Object.keys(i.variants[0].Stocks)[0] ===
					Object.keys(payload.variants[0].Stocks)[0]
		)
	) {
		cart = cart.filter((i) => {
			if (
				!(
					i.id_product === payload.id_product &&
					i.variants[0].ColorName === payload.variants[0].ColorName &&
					Object.keys(i.variants[0].Stocks)[0] ===
						Object.keys(payload.variants[0].Stocks)[0]
				)
			) {
				return i;
			}
		});
	}

	localStorage.setItem('cart', JSON.stringify(cart));
	return {
		type: 'REMOVE_CART',
		payload: cart,
	};
}

export function updatingCart(product) {
	let cart = JSON.parse(localStorage.getItem('cart'));
	cart = cart.map((p) => {
		if (p.id_product === product.id_product) {
			return product;
		}

		return p;
	});

	localStorage.setItem('cart', JSON.stringify(cart));
	return {
		type: 'UPDATING_CART',
		payload: cart,
	};
}

export function clearCart() {
	localStorage.removeItem('cart');
	return {
		type: 'CLEAR_CART',
		payload: [],
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
		try {
			return await axios.post('/client', payload);
		} catch (error) {
			console.log(error);
		}
	};
}

export function createClientGoogle(payload) {
	return {
		type: 'GET_GOOGLE_INFO',
		payload,
	};
}

export function getClients() {
	return async function (dispatch) {
		try {
			const { data } = await axios.get('/client');
			return dispatch({
				type: 'GET_CLIENTS',
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function logInUser(user) {
	return async function (dispatch) {
		try {
			const { data } = await axios.get(
				`/clientes/?login_name=${user.login_name}&login_password=${user.login_password}`
			);

			return !data
				? alert('Username/password not found')
				: (alert('You are logged in!'),
				  dispatch({
						type: 'LOG_IN_USER',
						payload: data,
				  }));
		} catch (error) {
			console.log(error);
		}
	};
}

export function logOutUser() {
	return {
		type: 'LOG_OUT_USER',
	};
}

export function getCart(phone) {
	return async function (dispatch) {
		try {
			let cart = JSON.parse(localStorage.getItem('cart')) || [];
			const { data } = await axios.get(`/cart/${phone}`);
      if(!data.cart_items.includes(null)) cart = cart.concat(data.cart_items);

			

			//escribir una función que elimine repetidos y los agregue al número de unidades que corresponda. 


			localStorage.setItem('cart', JSON.stringify(cart));

			
			return dispatch({
				type: 'GET_CART',
				payload: cart,
			});
		} catch (e) {
			console.log(e);
		}
	};
}

// Actions for customize products

export function selectingProduct(payload) {
	return {
		type: 'SELECTING_PRODUCT',
		payload: payload,
	};
}

// Data for buying products

export function saveSendingData(payload) {
	const {
		city,
		eMail,
		lastName,
		name,
		particularDetails,
		phoneNumber,
		provinceDepartment,
		streetNumber,
		zipCode,
	} = payload;
	const data = {
		phone: phoneNumber,
		email: eMail,
		name,
		lastname: lastName,
		address: {
			streetNumber,
			city,
			zipCode,
			provinceDepartment,
			particularDetails,
		},
	};

	localStorage.setItem('datosDeEnvio', JSON.stringify(data));
}

// Modified user data

export async function sendModifiedData(payload, dispatch) {
  axios.patch(`http://localhost:3001/client/${payload.phone}`, payload);
  dispatch({
    type: 'LOG_IN_USER',
    payload: payload,
  });
}