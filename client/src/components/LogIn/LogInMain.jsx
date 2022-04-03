import React from "react";
import { Link } from "react-router-dom";
import style from "./LoginMain.module.scss";

function LogInMain() {
  return (
    <div className={style.background}>
      <div className={style.container}>
        <div className={style.containerImage}>
          <img
            className={style.img}
            src={require("../../Assets/img/login_side.jpg")}
            alt=""
          />
        </div>
        <div className={style.containerForm}>
          <div className={style.subContainerForm}>
            <div className={style.containerHeader}>
              <h1 className={style.header}>Welcome back!</h1>
              <p className={style.subHeader}>It's great to have you back!</p>
            </div>

            <div className={style.containerInput}>
              <label className={style.labelInput}>Username</label>
              <input className={style.input} type="text" placeholder="Type username"/>
            </div>

            <div className={style.containerInput}>
              <label className={style.labelInput}>Password</label>
              <input className={style.input} type="password" placeholder="Type password"/>
            </div>

            <div className={style.containerOptions}>
              <div className={style.containerRememberMe}>
                <input className={style.buttonRemember} type="checkbox" />
                <label className={style.textRemember}>Remember me?</label>
              </div>

              <Link className={style.forgotText} to="/retrievepassword">Forgot password?</Link>
            </div>

            <div className={style.containerLoginSignUp}>
              <input className={style.loginButton} type="submit" value="Login" />
              <Link className={style.signUpButton} to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInMain;
