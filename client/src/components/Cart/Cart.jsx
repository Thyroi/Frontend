import React from "react";
import style from "./Cart.module.scss";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeCart } from "../../actions/index";
// Add the context for showing the items

function Cart() {
  // Provisional remove this when context is implemented
  const itemsCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className={style.containerCart}>
      {itemsCart.map((item) => {
        const { name, price, default_image, id_product } = item;
        return (
          <div className={style.itemContainer}>
            <div className={style.imgContainer}>
              <Link to={`/detail/${id_product}`}>
                <img
                  className={style.productImage}
                  src={default_image}
                  alt="iconOff"
                />
              </Link>
              {/* <img src="" alt="product" /> */}
            </div>

            <div className={style.infoContainer}>
              <div className={style.subInfoContainer}>
                <h3 className={style.nameProduct}>{name}</h3>
                <p className={style.productPrice}>{`$${price}`}</p>

                <div className={style.counterContainer}>
                  <button className={style.counterButton}>-</button>
                  <p className={style.counterNumber}>2</p>
                  <button className={style.counterButton}>+</button>
                </div>

                <div className={style.containerButtons}>
                  <div className={style.containerDiscount}>
                    <input
                      className={style.inputDiscount}
                      type="text"
                      placeholder="Discount Code"
                    />
                    <input
                      className={style.applyDiscount}
                      type="submit"
                      value="Apply"
                    />
                  </div>

                  <button
                    className={style.removeButton}
                    onClick={() => dispatch(removeCart(itemsCart, item))}
                  >
                    <img src="" alt="" />
                    <p>Remove</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className={style.purchaseContainer}>
        <p className={style.totalInfo}>
          Total due: <span className={style.totalPrice}>$900</span>
        </p>
        <button className={style.buyButton}>Buy</button>
      </div>
    </div>
  );
}

export default Cart;
