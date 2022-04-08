import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import style from "./Quantity.module.scss";

import {
  increaseLocalStock,
  decreaseLocalStock,
  totalDue,
  changingAttributesCart,
} from "../../utils/utils";

import { selectingProduct, updatingCart } from "../../actions/index";

function Quantity(props) {
  const product = props.product;
  const location = useLocation();
  const details = useSelector((state) => state.detailEdited);
  const cartItems = useSelector(state => state.cart);
  let number;

  const dispatch = useDispatch();
  const [state, setState] = useState(1);

  if (location.pathname === "/Cart") {
    number =
      product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]];
  }

  return (
    <div className={style.counterContainer}>
      <button
        className={style.counterButton}
        onClick={() => {
          const newProduct = decreaseLocalStock(product);
          dispatch(selectingProduct(newProduct));
          setState(state - 1);
          document.querySelector(
            "#individualProductPrice"
          ).textContent = `$${totalDue(product)}`;
        }}
      >
        -
      </button>
      <p className={style.counterNumber} id="quantity">
        {number || state}
      </p>
      <button
        className={style.counterButton}
        onClick={() => {
          if (location.pathname === "/Cart") {
            const newItemsCart = changingAttributesCart(cartItems, product, number + 1);
            
            dispatch(updatingCart(newItemsCart));
            return;
          }
          const newProduct = increaseLocalStock(product);
          dispatch(selectingProduct(newProduct));
          setState(state + 1);
          document.querySelector(
            "#individualProductPrice"
          ).textContent = `$${totalDue(product)}`;
        }}
      >
        +
      </button>
    </div>
  );
}

export default Quantity;
