import { React } from "react";
import style from "./Notification.module.scss";

function Notification() {
  return (
    <div className={style.noNotification} id="notification">
      <p className={style.text} id="textNotification">Product added to cart</p>
      <button className={style.closeButton}>X</button>
    </div>
  );
}

export default Notification;
