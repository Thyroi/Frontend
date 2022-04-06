import { React } from "react";
import style from "./Notification.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Notification() {
  return (
    <div className={style.noNotification} id="notification">
      <p className={style.text} id="textNotification">Product added to cart</p>
      <button className={style.closeButton}>
        <FontAwesomeIcon className={style.closeIcon} icon={faXmark} />
      </button>
    </div>
  );
}

export default Notification;
