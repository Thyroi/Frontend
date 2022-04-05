import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt, faCartShopping, faCirclePlus, faHouse  } from "@fortawesome/free-solid-svg-icons";

import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <div className={styles.container}>
      <NavLink
        to="/"
        exact
        activeClassName={styles.active}
        className={styles.title}
      >
        <FontAwesomeIcon className={styles.icons} icon={faHouse} /> Home
      </NavLink>

      <NavLink
        to="/Products"
        activeClassName={styles.active}
        className={styles.title}
      >
        <FontAwesomeIcon className={styles.icons} icon={faShirt} /> Products
      </NavLink>

      <NavLink
        to="/AddNewProduct"
        activeClassName={styles.active}
        className={styles.title}
      >
        <FontAwesomeIcon className={styles.icons} icon={faCirclePlus} /> Add Products
      </NavLink>

      <NavLink
        to="/Cart"
        activeClassName={styles.active}
        className={styles.title}
      >
        <FontAwesomeIcon className={styles.icons} icon={faCartShopping} /> Cart
      </NavLink>
    </div>
  );
}
