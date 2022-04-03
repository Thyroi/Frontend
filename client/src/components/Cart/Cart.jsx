import React from "react";
import style from "./Cart.module.scss";
//To add context below here

// Add the context for showing the items

function Cart() {
  // Provisional remove this when context is implemented
  const itemsCart = ["Clothe", "Clothe", "Clothe", "Clothe"];

  return (
    <div className={style.containerCart}>
      {itemsCart.map((item) => {
        return (
          <div className={style.itemContainer}>
            <div className={style.imgContainer}>
              <img className={style.productImage} src={require("../../Assets/img/login_side.jpg")} alt="iconOff" />
              {/* <img src="" alt="product" /> */}
            </div>

            <div className={style.infoContainer}>
              <div className={style.subInfoContainer}>
                <h3 className={style.nameProduct}>Name Product</h3>
                <p className={style.productPrice}>Product Price</p>

                <div className={style.counterContainer}>
                  <button className={style.counterButton}>-</button>
                  <p className={style.counterNumber}>2</p>
                  <button className={style.counterButton}>+</button>
                </div>

                <div className={style.containerButtons}>
                  <div className={style.containerDiscount}>
                    <input className={style.inputDiscount} type="text" placeholder="Discount Code" />
                    <input className={style.applyDiscount} type="submit" value="Apply" />
                  </div>

                  <button className={style.removeButton}>
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
        <button className={style.buyButton}>
          Buy
        </button>
      </div>
    </div>
  );
}

export default Cart;
