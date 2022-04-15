import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import style from "./Client_profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faWallet,
  faBagShopping,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function ClientProfile() {
  const client_info = useSelector((state) => state.loggedInClient);
  console.log(client_info);
  const { login_name, login_password, name, lastname, phone, email } =
    client_info;
  const { streetNumber, provinceDepartment, city, zipCode, particularDetails } =
    client_info.address;

  // useEffect(() => {
  //   document.querySelector("#form").addEventListener("onSubmit", (e) => {
  //     e.preventDefault();
  //     console.log(e.target);
  //   });
  // }, []);

  return (
    <div className={style.background}>
      <div className={style.firstColumn}>
        <div className={style.containerForm}>
          <form
            className={style.subContainerForm}
            id="form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
            }}
          >
            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>User</label>
                <input
                  className={style.input}
                  type="text"
                  name="login_name"
                  defaultValue={login_name}
                />
              </div>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Password</label>
                <input
                  className={style.input}
                  type="password"
                  name="login_password"
                  defaultValue={login_password}
                />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Name</label>
                <input
                  className={style.input}
                  type="text"
                  name="name"
                  defaultValue={name}
                />
              </div>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Last name</label>
                <input
                  className={style.input}
                  type="text"
                  name="lastname"
                  defaultValue={lastname}
                />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Phone</label>
                <input
                  className={style.input}
                  type="text"
                  name="phone"
                  defaultValue={phone}
                />
              </div>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Email</label>
                <input
                  className={style.input}
                  type="email"
                  name="email"
                  defaultValue={email}
                />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>Street</label>
                <input
                  className={style.input}
                  type="text"
                  name="streetNumber"
                  defaultValue={streetNumber}
                />
              </div>

              <div className={style.inputContainer}>
                <label className={style.titleInput}>State</label>
                <input
                  className={style.input}
                  type="text"
                  name="provinceDepartment"
                  defaultValue={provinceDepartment}
                />
              </div>

              <div className={style.inputContainer}>
                <label className={style.titleInput}>City</label>
                <input
                  className={style.input}
                  type="text"
                  name="city"
                  defaultValue={city}
                />
              </div>

              <div className={style.inputContainer}>
                <label className={style.titleInput}>Zip code</label>
                <input
                  className={style.input}
                  type="text"
                  name="zipCode"
                  defaultValue={zipCode}
                />
              </div>

              <div className={style.inputContainer}>
                <label className={style.titleInput}>Other details</label>
                <input
                  className={style.input}
                  type="text"
                  name="particularDetails"
                  defaultValue={particularDetails}
                />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainerSave}>
                <input
                  className={style.saveDataButton}
                  type="submit"
                  value="Modify data"
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
