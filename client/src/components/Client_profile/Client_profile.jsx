import React from "react";
import style from "./Client_profile.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faWallet,
  faBagShopping,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function ClientProfile() {
  return (
    <div className={style.background}>
      <div className={style.firstColumn}>
        <div className={style.containerForm}>
          <form className={style.subContainerForm}>
            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>User</label>
                <input className={style.input} type="text" />
              </div>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Password</label>
                <input className={style.input} type="text" />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Name</label>
                <input className={style.input} type="text" />
              </div>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Last name</label>
                <input className={style.input} type="text" />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Age</label>
                <input className={style.input} type="text" />
              </div>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>DNI</label>
                <input className={style.input} type="text" />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Phone</label>
                <input className={style.input} type="text" />
              </div>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Email</label>
                <input className={style.input} type="text" />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Street</label>
                <input className={style.input} type="text" />
              </div>

              <div className={style.inputContainer}>
                <label className={style.titleInput}>State</label>
                <input className={style.input} type="text" />
              </div>

              <div className={style.inputContainer}>
                <label className={style.titleInput}>City</label>
                <input className={style.input} type="text" />
              </div>

              <div className={style.inputContainer}>
                <label className={style.titleInput}>Zip code</label>
                <input className={style.input} type="text" />
              </div>

              <div className={style.inputContainer}>
                <label className={style.titleInput}>Other details</label>
                <input className={style.input} type="text" />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainerSave}>
                <input
                  className={style.saveDataButton}
                  type="submit"
                  value="Save data"
                />
              </div>
            </div>
          </form>
        </div>

        <div className={style.infoContainer}>
          <div className={style.totalSpendContainer}>
            <FontAwesomeIcon className={style.infoIconW} icon={faWallet} />
            <div className={style.textInfo}>
              <p className={style.textInfoTitle}>Total spend</p>
              <p className={style.textInfoContent}>$600000</p>
            </div>
          </div>

          <div className={style.totalPurchaseContainer}>
            <FontAwesomeIcon className={style.infoIconB} icon={faBagShopping} />
            <div className={style.textInfo}>
              <p className={style.textInfoTitle}>Total purchase</p>
              <p className={style.textInfoContent}>$600000</p>
            </div>
          </div>

          <div className={style.deleteAccountContainer}>
            <FontAwesomeIcon className={style.infoIconC} icon={faTrashCan} />
            <p className={style.deleteText}>Delete account</p>
          </div>
        </div>
      </div>

      <div className={style.secondColumn}>
        <div className={style.profileImageContainer}>
          <img
            className={style.profileImage}
            src="https://ichef.bbci.co.uk/news/624/amz/worldservice/live/assets/images/2015/05/11/150511213032_sp_bin_laden_624x351_ap.jpg"
            alt="profile"
          />
        </div>

        <div className={style.containerCart}>
          <FontAwesomeIcon className={style.cartImage} icon={faCartShopping} />
          <p className={style.itemsInCart}>8</p>
        </div>

        <div className={style.generalButtons}>
          <div className={style.generalButton}>History</div>
          <div className={style.generalButton}>Favorites</div>
          <div className={style.generalButton}>Orders</div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
