import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import style from "./Quantity.module.scss";

import {
  increaseLocalStock,
  decreaseLocalStock,
  totalDue,
} from "../../utils/utils";

import { selectingProduct, updatingCart } from "../../actions/index";

function Quantity(props) {
  const product = props.product;
  const templateProduct = useSelector((state) => state.detailEdited);

  // const details = useSelector((state) => state.detailEdited);
  // const cartItems = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const [state, setState] = useState(1);

  if(!product.variants) return <div>  </div>

  return (
    <div className={style.counterContainer}>
      <button
        className={style.counterButton}
        
      >
        -
      </button>
      <p className={style.counterNumber} id="quantity">
        {product.variants[0].Stocks[Object.keys(product.variants[0].Stocks)[0]]}
      </p>
      <button
        className={style.counterButton}
        onClick={() => {
          const newProduct = increaseLocalStock(product, templateProduct);
          dispatch(selectingProduct({...newProduct}));
        }}
      >
        +
      </button>
    </div>
  );
}

export default Quantity;
