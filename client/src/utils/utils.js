import styleDetail from '../components/Product_detail/Product_detail.module.scss';
import styleNotification from '../components/Notification/Notification.module.scss';
import axios from 'axios';

// Notification
export function Notifications(text) {
	let notification = document.querySelector('#notification');
	if (notification) {
		document.querySelector('#textNotification').innerHTML = text;

		if (notification.classList.contains(styleNotification.notification))
			notification.classList.remove(styleNotification.notification);

		if (notification.classList.contains(styleNotification.noNotification))
			notification.classList.remove(styleNotification.noNotification);

		if (
			notification.classList.contains(styleNotification.notification_hide)
		)
			notification.classList.remove(styleNotification.notification_hide);

		notification.classList.add(styleNotification.notification);

		setTimeout(function () {
			notification.classList.remove(styleNotification.notification);

			if (
				notification.classList.contains(
					styleNotification.notification_hide
				)
			)
				return;
			notification.classList.add(styleNotification.notification_hide);
		}, 5000);
	}
}

export function removeNotification() {
	let notification = document.querySelector('#notification');
	if (notification) {
		notification.classList.remove(styleNotification.notification);
		notification.classList.add(styleNotification.notification_hide);
	}
}

// Change default Image

export function selectImage(image) {
	let defaultImage = document.querySelector('#default_image');
	defaultImage.setAttribute('src', image);
}

// Showing colors

export function productColor(product) {
	if (product === undefined) return [];

	let colors = [];
	product.variants?.forEach((variant) => {
		if (!colors.includes(variant.ColorName)) colors.push(variant.ColorName);
	});

	return colors;
}

// Showing sizes

export function productSizes(product) {
	if (product === undefined) return [];

	let sizes = [];
	product.variants?.forEach((variant) => {
		const variantSizes = Object.keys(variant.Stocks);
		variantSizes.forEach((size) => {
			if (!sizes.includes(size)) sizes.push(size);
		});
	});

	return sizes;
}

// Select variant
// Dont judge me!
export function formattingProduct(product, templateProduct) {
	const copyTemplateProduct = Object.assign({}, templateProduct);
	product.variants = [];
	product.variants.push(Object.assign({}, copyTemplateProduct.variants[0]));

	const key = Object.keys(copyTemplateProduct.variants[0].Stocks)[0];

	product.variants[0].Stocks = {};
	product.variants[0].Stocks[key] = 1;
	product.variants[0].leftUnits = copyTemplateProduct.variants[0].Stocks[key];

	product.totalPrice = product.price;

	focusSelectedColor(product.variants[0].ColorName);
	focusSelectedSize(Object.keys(product.variants[0].Stocks)[0]);
	return product;
}

export function selectVariant(templateProduct, product, color) {
	const copyTemplateProduct = Object.assign({}, templateProduct);
	copyTemplateProduct.variants.forEach((variant) => {
		if (variant.ColorName === color) {
			copyTemplateProduct.variants = [];
			copyTemplateProduct.variants.push(variant);

			product = formattingProduct(product, copyTemplateProduct);
			focusSelectedColor(color);
		}
	});

	return product;
}

export function selectSize(templateProduct, product, size) {
	const variants = templateProduct.variants;
	variants.forEach((variant) => {
		if (variant.ColorName === product.variants[0].ColorName) {
			const Stocks = variant.Stocks;
			for (let s in Stocks) {
				if (s === size) {
					product.variants[0].leftUnits = Stocks[s];
					product.variants[0].Stocks = {};
					product.variants[0].Stocks[s] = 1;
					console.log(product);
					focusSelectedSize(size);
				}
			}
		}
	});

	return product;
}

function focusSelectedColor(color) {
	let colors = document.querySelector('#colors');
	let childColors = colors.childNodes;

	childColors.forEach((childColor) => {
		if (childColor.classList.contains(styleDetail.selectedColor)) {
			childColor.classList.remove(styleDetail.selectedColor);
			childColor.classList.add(styleDetail.color);
		}
	});

	childColors.forEach((childColor) => {
		if (childColor.innerHTML === color) {
			childColor.classList.remove(styleDetail.color);
			childColor.classList.add(styleDetail.selectedColor);
		}
	});
}

function focusSelectedSize(size) {
	let sizes = document.querySelector('#sizes');
	let childSizes = sizes.childNodes;

	childSizes.forEach((childSize) => {
		if (childSize.classList.contains(styleDetail.selectedSize)) {
			childSize.classList.remove(styleDetail.selectedSize);
			childSize.classList.add(styleDetail.size);
		}
	});

	childSizes.forEach((childSize) => {
		if (childSize.innerHTML === size) {
			childSize.classList.remove(styleDetail.size);
			childSize.classList.add(styleDetail.selectedSize);
		}
	});
}

export function increaseLocalStock(product) {
	const top = product.variants[0].leftUnits;
	let nextAmount =
		product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]] +
		1;
	if (nextAmount <= top) {
		product.variants[0].Stocks[
			Object.keys(product.variants[0].Stocks)[0]
		] += 1;

		const totalToPay = totalDue(product);
		product.totalPrice = totalToPay;
	}

	return product;
}

export function decreaseLocalStock(product, templateProduct) {
	let nextAmount =
		product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]] +
		1;
	if (nextAmount > 2) {
		product.variants[0].Stocks[
			Object.keys(product.variants[0].Stocks)[0]
		] -= 1;

		const totalToPay = totalDue(product);
		product.totalPrice = totalToPay;
	}

	return product;
}

export function totalDue(product, cartItems) {
	if (cartItems) {
		let total = 0;
		cartItems.forEach((item) => {
			item.totalPrice = parseFloat(item.totalPrice);
			total += item.totalPrice;
		});

		total = total.toFixed(2);
		return total;
	}

	let price = product.price;
	let units =
		product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]];
	let total = (price * units).toFixed(2);

	return total;
}

export async function prepareProduct(product, cartItems) {
	let productToBuy = [];
	console.log(product, cartItems);

	if (product) {
		let totalPrice = parseFloat(product.totalPrice).toFixed(2);

		productToBuy = [
			{
				name: product.name,
				productid: product.id_product,
				quantity:
					product.variants[0].Stocks[
						Object.keys(product.variants[0].Stocks)[0]
					],
				image: product.variants[0].ProductImages[0],
				price: totalPrice,
				color: product.variants[0].ColorName,
				size: Object.keys(product.variants[0].Stocks)[0],
			},
		];
	}

	if (cartItems) {
		productToBuy = cartItems.map((item) => {
			let totalPrice = parseFloat(item.totalPrice);

			return {
				name: item.name,
				productid: item.id_product,
				quantity:
					item.variants[0].Stocks[
						Object.keys(item.variants[0].Stocks)[0]
					],
				image: item.variants[0].ProductImages[0],
				price: totalPrice,
				color: item.variants[0].ColorName,
				size: Object.keys(item.variants[0].Stocks)[0],
			};
		});
	}

	localStorage.setItem('productPrepared', JSON.stringify(productToBuy));
}

export async function createGuestClient(/* setLoad */) {
	const data = JSON.parse(localStorage.getItem('datosDeEnvio'));

	await axios.post('/client', data, {
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${window.localStorage.getItem('token')}`,
		},
	});
	//setLoad(false);
}

export async function purchaseOrder(status) {
	const productPrepared = JSON.parse(localStorage.getItem('productPrepared'));
	const datosDeEnvio = JSON.parse(localStorage.getItem('datosDeEnvio'));
	let totalDue = 0;
	productPrepared.forEach((item) => {
		let price = item.price;
		price = parseFloat(price);
		price = price.toFixed(2);
		price = parseFloat(price);
		totalDue += price;
	});

	// const totalDue = productPrepared.reduce((total, item) => {
	//   return total + item.price;
	// });
	let statusM;
	if (status === 'rejected') statusM = 'Canceled';
	if (status === 'in_process') statusM = 'Processing';
	else statusM = 'Completed';
	const data = {
		orderDetails: [...productPrepared],
		total: totalDue,
		address: datosDeEnvio.address,
		clientPhone: parseInt(datosDeEnvio.phone),
		orderStatus: statusM,
	};

	console.log(data, '_____________purchase');

	await axios.post('/orders', data, {
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${window.localStorage.getItem('token')}`,
		},
	});

	// Remove purchase info from localStorage
	// localStorage.removeItem("productPrepared");
	// localStorage.removeItem("datosDeEnvio");
}

export function saveCart(id, cart) {
	if (id) {
		axios.put(
			`/cart/${id}`,
			{ cart_items: cart },
			{
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			}
		);
	}
}

/* export function sendingCart(cartItems, phone) {
	if (cartItems.length === 0 || cartItems === undefined) return;

	const dataToSend = {
		cart_items: { cartItems },
	};

	axios.put(`/cart/${phone}`, dataToSend);
} */

export function showingNumberCart() {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];

	if (!cart || cart.length === 0) return 0;
	if (cart.includes(null)) return 0;

	let numberCart = 0;

	cart.forEach((product) => {
		numberCart +=
			product.variants[0].Stocks[
				Object.keys(product.variants[0].Stocks)[0]
			];
	});

	return numberCart;
}

export async function getOrders(phone) {
	console.log(phone);
	const orders = await axios.get(`/orders?client=${phone}`, {
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${window.localStorage.getItem('token')}`,
		},
	});
	return orders.data;
}

export async function deleteAccount(phone) {
	await axios.delete(`/client/${phone}`, {
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${window.localStorage.getItem('token')}`,
		},
	});
}

export async function resetPassword(phone, login_password, swal) {
	const reset = { ogin_password: login_password };
	try {
		const { data } = await axios.patch(
			`/client/${phone}`,
			reset /* , {
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
			},
		} */
		);
		if (data === "Cliente actualizado con Exito!!" ) {
			swal({  title: "Congratulations!",
			text: "Your account has been verified correctly!",
			icon: "success",
			buttons: false, closeOnClickOutside: false, closeOnEsc: false, timer: 4000 });
			window.location.href = '/home';
		} 	
	} catch (e) {
		console.log(e);
		swal(
			'Error :s',
			'there has been a problem, contact support',
			'error'
		);
		window.location.href = '/home';
	}
}

export async function sendReset(email, swal) {
	try {
		const { data } = await axios.get(`/client/resetPass?email=${email}`, {
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
			},
		});
		if (data === `Correo de reseteo enviado`) {
			swal(
				'Success!',
				`We've sent an email to ${email} with instructions`,
				'success'
			);
			window.location.href = '/home';
		} else {
			swal(
				'Error :s',
				'There is not such an email in our database, please sign up',
				'error'
			);
			window.location.href = '/home';
		}
	} catch (e) {
		console.log(e);
	}
}

export async function setNewOffer(payload) {
	try {
		const { data } = await axios.patch('/offers/newOffer', payload, {
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${window.localStorage.getItem('token')}`,
			},
		});
		console.log(data);
	} catch (e) {
		console.log(e);
	}
}
