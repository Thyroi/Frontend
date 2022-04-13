import React from "react";
import style from "./Client_profile.module.scss";


function ClientProfile(){
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
                <label className={style.titleInput}>User</label>
                <input className={style.input} type="text" />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>User</label>
                <input className={style.input} type="text" />
              </div>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>User</label>
                <input className={style.input} type="text" />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>User</label>
                <input className={style.input} type="text" />
              </div>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>User</label>
                <input className={style.input} type="text" />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>User</label>
                <input className={style.input} type="text" />
              </div>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>User</label>
                <input className={style.input} type="text" />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <label className={style.titleInput}>User</label>
                <input className={style.input} type="text" />
              </div>
            </div>

            <div className={style.formGroups}>
              <div className={style.inputContainer}>
                <input className={style.saveDataButton} type="submit" value="Save data" />
              </div>
            </div>
          </form>
        </div>

        <div className={style.infoContainer}>
          <div className={style.totalSpendContainer}>

          </div>
          <div className={style.totalPurchaseContainer}>

          </div>
          <div className={style.deleteAccountContainer}>

          </div>
        </div>

      </div>
      <div className={style.secondColumn}>
        <div className={style.profileImageContainer}>
          <img className={style.profileImage} src="" alt="profile" />
        </div>

        <div className={style.containerCart}>
          <img className={style.cartImage} src="" alt="cart"/>
          <p className={style.itemsInCart}>8</p>
        </div>

        <div className={style.generalButtons}>
          <div className={style.generalButton}>History</div>
          <div className={style.generalButton}>Favorites</div>
          <div className={style.generalButton}>Orders</div>
        </div>
      </div>
    </div>
  )
}

export default ClientProfile;