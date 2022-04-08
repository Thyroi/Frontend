import axios from "axios";
import { Notifications } from "../utils/utils.js";

export function getInfo() {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/products/");
    return dispatch({
      type: "GET_ALL",
      payload: info.data,
    });
  };
}

export function getByName(obj) {
  return async function (dispatch) {
    console.log(obj);
    var name = await axios.get(`http://localhost:3001/products?filters=${obj}`);
    return dispatch({
      type: "GET_BY_NAME",
      payload: name.data,
    });
  };
}

export function getById(params) {
  return async function (dispatch) {
    var id = await axios.get(`http://localhost:3001/products/${params}`);
    return dispatch({
      type: "GET_BY_ID",
      payload: id.data,
    });
  };
}

export function getSelectorsCat() {
  return async function (dispatch) {
    var selectorsCat = await axios.get(
      "http://localhost:3001/selectors/categories"
    );
    var response = selectorsCat.data.data.map((p) => {
      return { id: p.id_category, name: p.name };
    });
    return dispatch({
      type: "GET_SELECTOR_CAT",
      payload: response,
    });
  };
}

export function getSelectorsCol() {
  return async function (dispatch) {
    var selectorsCol = await axios.get(
      "http://localhost:3001/selectors/collections"
    );
    var response = selectorsCol.data.data.map((p) => {
      return { id: p.id_collection, name: p.name };
    });

    return dispatch({
      type: "GET_SELECTOR_COL",
      payload: response,
    });
  };
}

export function getByCatId(payload) {
  return async function (dispatch) {
    var catId = await axios.get(
      `http://localhost:3001/products/bycat?id=${payload}`
    );
    return dispatch({
      type: "GET_BY_CAT_ID",
      payload: catId.data.Products,
    });
  };
}

export function getByColId(payload) {
  return async function (dispatch) {
    var catId = await axios.get(
      `http://localhost:3001/products/bycol?id=${payload}`
    );
    return dispatch({
      type: "GET_BY_COL_ID",
      payload: catId.data,
    });
  };
}

export function getOffers(pay) {
  return async function (dispatch) {
    var info = await axios.get(
      `http://localhost:3001/products/byoffer?offer=${pay}`
    );
    return dispatch({
      type: "GET_OFFERS",
      payload: info.data.data,
    });
  };
}

export function addProduct(payload) {
  return async function () {
    const add = await axios.post("http://localhost:3001/products/add", payload);
    return alert("Producto creado con exito");
  };
}

// Actions for Cart guest

export function addCart(cartProducts, payload, dispatch) {
  if (!cartProducts.some((p) => p.id_product == payload.id_product)) {
    if(localStorage.getItem("cart") != null) localStorage.removeItem("cart");
    cartProducts.push(payload);

    localStorage.setItem("cart", JSON.stringify(cartProducts));
    const cart = JSON.parse(localStorage.getItem("cart"));

    Notifications("Product added to cart");

    return dispatch({
      type: "ADD_CART",
      payload: cart,
    });
  }

  Notifications("This product is already in your cart");
}

export function removeCart(cartProducts, payload) {
  const newConstProducts = cartProducts.filter(
    (p) => p.id_product !== payload.id_product
  );

  window.localStorage.setItem("cart", JSON.stringify(newConstProducts));
  const cart = JSON.parse(window.localStorage.getItem("cart"));

  Notifications("Product removed from cart");
  return {
    type: "REMOVE_CART",
    payload: cart,
  };
}

export function updatingCart(cartProducts){

  localStorage.setItem("cart", JSON.stringify(cartProducts));
  const cart = JSON.parse(localStorage.getItem("cart"));

  return {
    type: "UPDATING_CART",
    payload: cart
  }
}

// Actions for customize products

export function selectingProduct(payload){
  return {
    type: "SELECTING_PRODUCT",
    payload: payload
  }
}

// Data for sending products
export function saveSendingData(){
  let labels = document.querySelectorAll("label");
  labels = Array.from(labels);

  let data = {}

  labels.forEach(label => {
    const property = label.id;
    const value = label.nextSibling.value;
    data[property] = value;
  })


  localStorage.setItem("datosDeEnvío", JSON.stringify(data));
  const payload = JSON.parse(localStorage.getItem("datosDeEnvío"));
  
  return {
    type: "SAVE_DATA",
    payload: payload
  }
}