import styleDetail from '../components/Product_detail/Product_detail.module.scss';
import styleNotification from '../components/Notification/Notification.module.scss';
import axios from 'axios';
import { useDispatch } from 'react-redux';

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
  product.variants[0].leftUnits =
    copyTemplateProduct.variants[0].Stocks[key];


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


  const top = product.variants[0].leftUnits;
  let nextAmount =
    product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]] + 1;
  if (nextAmount <= top) {
    product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]] += 1;

    const totalToPay = totalDue(product);
    product.totalPrice = totalToPay;
  }

  return product;
}

export function decreaseLocalStock(product, templateProduct) {
  let nextAmount =
    product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]] + 1;
  if (nextAmount > 2) {
    product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]] -= 1;

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

  if (product) {
    let totalPrice = parseFloat(product.totalPrice).toFixed(2);

    productToBuy = [
      {
        productid: product.id_product,
        quantity:
          product.variants[0].Stocks[
            Object.keys(product.variants[0].Stocks)[0]
          ],
        //image: product.variants[0].ProducImages[0],
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
        productid: item.id_product,
        quantity:
          item.variants[0].Stocks[Object.keys(item.variants[0].Stocks)[0]],
       // image: item.variants[0].ProducImages[0],
        price: totalPrice,
        color: item.variants[0].ColorName,
        size: Object.keys(item.variants[0].Stocks)[0],
      };
    });
  }

  localStorage.setItem("productPrepared", JSON.stringify(productToBuy));

}



export async function createGuestClient() {
	const data = JSON.parse(localStorage.getItem('datosDeEnvio'));
	console.log(data, '_______________client');
	await axios.post('/client', data);
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

	const data = {
		orderDetails: [...productPrepared],
		total: totalDue,
		address: datosDeEnvio.address,
		clientPhone: parseInt(datosDeEnvio.phone),
		orderStatus:
			status === 'rejected'
				? 'Canceled'
				: status === 'pending'
				? 'Processing'
				: 'Completed',
	};

	console.log(data, '_____________purchase');

	await axios.post('/orders', data);

	// Remove purchase info from localStorage
	// localStorage.removeItem("productPrepared");
	// localStorage.removeItem("datosDeEnvio");
}

export function sendingCart(cartItems) {
	if (cartItems.length === 0 || cartItems === undefined) return;

	const dataToSend = {
		cart_items: { cartItems },
	};

	axios.put('/cart/6631651', dataToSend);
}

export function showingNumberCart() {
	const cart = JSON.parse(localStorage.getItem('cart'));
	if (!cart) return 0;

	let numberCart = 0;

	cart.forEach((product) => {
		numberCart +=
			product.variants[0].Stocks[
				Object.keys(product.variants[0].Stocks)[0]
			];
	});

	return numberCart;
}

export function sendPaymentData(info) {
	console.log(info, '______________sendinpayment');
	axios.post('/payments', info);
}
