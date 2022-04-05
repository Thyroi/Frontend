import React from "react";
import style from "./Quantity.module.scss";

function Quantity() {
  return (
    <div className={style.counterContainer}>
      <button className={style.counterButton}>-</button>
      <p className={style.counterNumber}>2</p>
      <button className={style.counterButton}>+</button>
    </div>
  );
}

export default Quantity;
