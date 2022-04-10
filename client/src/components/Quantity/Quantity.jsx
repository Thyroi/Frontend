import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import style from "./Quantity.module.scss";

import { increaseLocalStock, decreaseLocalStock } from "../../utils/utils";

import { selectingProduct, updatingCart } from "../../actions/index";

function Quantity(props) {
  const [state, setState] = useState();
  const product = props.product;

  useEffect(() => {
    setState(product);
  }, [product]);

  const path = useLocation().pathname;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (!product.variants) return <div> </div>;

  return (
    <div className={style.counterContainer}>
      <button
        className={style.counterButton}
        onClick={() => {
          const newProduct = Object.assign({}, decreaseLocalStock(product));
          path = "/cart" ? dispatch(updatingCart(newProduct)) : dispatch(selectingProduct(newProduct));
        }}
      >
        -
      </button>
      <p className={style.counterNumber} id="quantity">
        {product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]]}
      </p>
      <button
        className={style.counterButton}
        onClick={() => {
          const newProduct = Object.assign({}, increaseLocalStock(product, cartItems));
          path = "/cart" ? dispatch(updatingCart(newProduct)) : dispatch(selectingProduct(newProduct));
        }}
      >
        +
      </button>
    </div>
  );
}

export default Quantity;
