import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, logOutUser } from "../../actions";

import styles from "./LoginTop.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function LogInTop() {
  const dispatch = useDispatch();

  const { login_name, name } = useSelector((state) => state?.loggedInClient);

  function handleLogOut(e) {
    e.preventDefault();
    dispatch(clearCart());
    dispatch(logOutUser());
    alert("logged out");
  }

  return (
    <div className={styles.loginContainer}>
      {login_name && <button onClick={handleLogOut}>log out</button>}
      <Link className={styles.text} to="/login">
        {login_name ? (
          <div className={styles.userDisplay}>
            <div>
              <Link to="/client/profile">{login_name}</Link>
            </div>
            <div>
              <Link to="/client/profile">{`Hola, ${name}!`}</Link>
            </div>
          </div>
        ) : (
          `Sign up or Log in`
        )}
        <FontAwesomeIcon icon={faCircleUser} className={styles.icon} />
      </Link>
    </div>
  );
}

export default LogInTop;
