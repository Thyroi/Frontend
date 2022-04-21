import { async } from '@firebase/util';
import axios from 'axios';

export function getInfo(nested) {
	return async function (dispatch) {
		try {
			var info = await axios.get(
				`/products?offer=${nested.offer}&collection=${nested.collection}&category=${nested.category}&type=${nested.type}&method=${nested.method}`
				// {
				// 	headers: {
				// 		'content-type': 'application/json',
				// 		Authorization: `Bearer ${window.localStorage.getItem(
				// 			'token'
				// 		)}`,
				// 	},
				// }
			);
			return dispatch({
				type: 'GET_ALL',
				payload: info.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getStats() {
	return async function (dispatch) {
		try {
			var { data } = await axios.get(`/statistics/get`);
			return dispatch({
				type: 'GET_STATS',
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getSelectorsCol() {
	return async function (dispatch) {
		try {
			var { data } = await axios.get('/selectors/collections', {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
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

export function getByName(obj, swal) {
	return async function (dispatch) {
		try {
			var name = await axios.get(`/products/?filters=${obj}`, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
			return dispatch({
				type: 'GET_BY_NAME',
				payload: name.data,
			});
		} catch (error) {
			swal('Oops!', 'Nothing found, showing all products', 'info');
			return dispatch({
				type: 'RECOVER_PRODUCTS',
			});
		}
	};
}

export function getById(params) {
	return async function (dispatch) {
		try {
			var id = await axios.get(`/products/${params}`, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});

			// id.data.variants.forEach((variant) => {
			// 	variant.ProductImages.shift();
			// });

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
			const { data } = await axios.get('/selectors/categories', {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});

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
			var { data } = await axios.get(`/products/bycat`, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});

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
			var { data } = await axios.get(`/products/bycol?id=${payload}`, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});

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
			var { data } = await axios.get(`/products/byoffer?offer=${pay}`, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});

			return dispatch({
				type: 'GET_OFFERS',
				payload: [...data.women, ...data.men],
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function addProduct(payload, swal) {
	return async function () {
		try {
			await axios.post('/products/add', payload, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
			return swal('Success', 'Product successfully created!', 'success');
		} catch (error) {
			console.log(error);
		}
	};
}

export function getOrders() {
	return async function (dispatch) {
		try {
			var orders = await axios.get('/orders', {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
			return dispatch({
				type: 'GET_ORDERS',
				payload: orders.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function orderFilter(payload) {
	return async function (dispatch) {
		try {
			const fil = await axios.get(`/orders?status=${payload}`, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
			console.log(fil);
			return dispatch({
				type: 'ORDER_FILTER',
				payload: fil.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getOrdersById(id) {
	return async function (dispatch) {
		try {
			var order = await axios.get(`/orders/${id}`, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
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
			const update = await axios.patch(`/orders/${id}`, payload, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
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

export function getAllUsers() {
	return async function (dispatch) {
		try {
			const allusers = await axios.get('/users', {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
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
			const update = await axios.put(`/users`, payload, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
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
		return await axios.delete(`/users`, {
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
			},
			data: payload,
		});
	} catch (error) {
		console.log(error);
	}
};

export const addCategory = (payload) => async (dispatch) => {
	try {
		return await axios.post(`/selectors/addCat`, payload, {
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

export function addNewUser(payload) {
	return async function () {
		try {
			await axios.post('/users', payload, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
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

export function createClient(payload, setLoad) {
	return async function () {
		try {
			const result = await axios.post('/client', payload, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
			setLoad(false);
			return result;
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
			const { data } = await axios.get('/client', {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
			return dispatch({
				type: 'GET_CLIENTS',
				payload: data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function logInUser(user, swal, setLoad) {
	return async function (dispatch) {
		try {
			const dato = { login_name: user.login_name };
			const { data } = await axios.post('/login', dato);
			console.log(data);
			window.localStorage.setItem('token', data.token);

			if (data.message === 'Incorrect login name or password') {
				swal('Oh, oh!', 'User or password not found', 'warning');
				setLoad('false');
				return;
			}

			return dispatch({
				type: 'LOG_IN_USER',
				payload: data.client,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function logInAdmin(user, swal, setLoad) {
	return async function (dispatch) {
		try {
			const dato = { user_name: user.login_name };
			const { data } = await axios.post('/login/admin', dato, {
				headers: {
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
			window.localStorage.setItem('token', data.token);

			if (!data) {
				swal('Oh, oh!', 'User or password not found', 'warning');
				setLoad('false');
				return;
			}

			return dispatch({
				type: 'LOG_IN_ADMIN',
				payload: data.user,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function logOutUser() {
	window.localStorage.removeItem('token');
	return {
		type: 'LOG_OUT_USER',
	};
}

export function getCart(phone) {
	return async function (dispatch) {
		try {
			let cart = JSON.parse(localStorage.getItem('cart')) || [];
			const { data } = await axios.get(`/cart/${phone}`, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});

			/* if (!data.cart_items.includes(null))
				cart = cart.concat(data.cart_items); */

			data?.cart_items?.forEach((i) => {
				if (
					//algún item de cart tiene el mismo id_product y el mismo color que algún otro de la respuesta de data...
					cart.some(
						(c) =>
							c.id_product === i.id_product &&
							c.variants[0].ColorName ===
								i.variants[0].ColorName &&
							Object.keys(c.variants[0].Stocks)[0] ===
								Object.keys(i.variants[0].Stocks)[0]
					)
				) {
					//entonces se suma la cantidad de ese item de cart al item de data
					cart = cart.map((c) => {
						if (
							c.id_product === i.id_product &&
							c.variants[0].ColorName ===
								i.variants[0].ColorName &&
							Object.keys(c.variants[0].Stocks)[0] ===
								Object.keys(i.variants[0].Stocks)[0]
						) {
							c.variants[0].Stocks[
								Object.keys(i.variants[0].Stocks)[0]
							] +=
								i.variants[0].Stocks[
									Object.keys(i.variants[0].Stocks)[0]
								];
							return c; //y se devuelve el objeto con el item de la BD sumado
						}
						return c; //si no hay coincidencia, se devuelve el ítem sin sumar nada.
					});
				} else {
					cart.push(i); //si no tengo coincidencias entre BD y localstorage, pusheo ítems de BD en localstorage
				}
			});

			if (cart.length === 0) {
				return dispatch({
					type: 'ADD_CART',
					payload: null,
				});
			}

			localStorage.setItem('cart', JSON.stringify(cart));
			//await axios.put(`/cart/${phone}`, { cart_items: cart });

			return dispatch({
				type: 'GET_CART',
				payload: cart,
			});
		} catch (e) {
			console.log(e);
		}
	};
}

export function setRememberMe() {
	return { type: 'SET_REMEMBER_ME' };
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

export function sendModifiedData(payload, lastphone) {
	return async function (dispatch) {
		try {
			await axios.patch(`/client/${lastphone}`, payload, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
			dispatch({
				type: 'LOG_IN_USER',
				payload: payload,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getUserLists(id) {
	return async function (dispatch) {
		try {
			let lists = await axios.get(`/lists/get?ClientPhone=${id}`, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
			return dispatch({
				type: 'GET_USER_LISTS',
				payload: lists.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getSpecificList(id, title) {
	return async function (dispatch) {
		try {
			let lists = await axios.get(
				`/lists/getbyidandtitle?ClientPhone=${id}&title=${title}`
			);
			return dispatch({
				type: 'GET_SPECIFIC_LIST',
				payload: lists.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function createList(payload, swal) {
	return async function () {
		try {
			await axios.post('/lists/create', payload, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
			return swal('Success!', 'List created!', 'success');
		} catch (error) {
			console.log(error);
		}
	};
}

export function updateList(payload) {
	return async function () {
		try {
			await axios.patch('/lists/update', payload, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function updateListDeleted(payload, swal) {
	return async function () {
		try {
			await axios.patch('/lists/update', payload, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
			return swal(
				'Success!',
				'Deleted succesfully from your list',
				'success'
			);
		} catch (error) {
			console.log(error);
		}
	};
}

export function deleteList(id) {
	return async function () {
		try {
			await axios.delete(`lists/delete?id=${id}`, {
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function nested(payload) {
	return {
		type: 'NESTED',
		payload: payload,
	};
}

export function orderByPrice(params) {
	return async function (dispatch) {
		try {
			const ordered = await axios.get(`/products/order?type=${params}`);
			return dispatch({
				type: 'ORDER_BY_PRICE',
				payload: ordered.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function orderByArrive(params) {
	return async function (dispatch) {
		try {
			const arrive = await axios.get(
				`/products/getByMoreRecent?order=${params}`
			);
			return dispatch({
				type: 'ORDER_BY_ARRIVE',
				payload: arrive.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function shareList(payload, swal) {
	return async function () {
		try {
			await axios.patch(`/lists/share`, payload);
			swal('Success!', 'Email sent succesfully', 'success');
		} catch (error) {
			console.log(error);
		}
	};
}

export function orderByStars(params) {
	return async function (dispatch) {
		try {
			const stars = await axios.get(
				`/reviews/get/?orderField=stars&order=${params}`
			);
			return dispatch({
				type: 'ORDER_BY_STARS',
				payload: stars.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function verifyDiscount(params, swal){
	return async function(){
		try{
			const newPrice = await axios.patch("/cart/verifyDiscount", params)
			if(newPrice.data !== params.total){
				/* swal('Success!', 'Discount applied successfully', 'success'); */
				return console.log(newPrice.data)
			} else {
				/* swal('Oh, oh!', 'Discount code invalid', 'warning'); */
				return console.log("NO")
			}
		}
		catch(error){
			console.log(error)
		}
	}
}
