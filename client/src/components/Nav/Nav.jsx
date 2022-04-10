
import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showingNumberCart } from "../../utils/utils"
import {
	faCartShopping,
	faCirclePlus,
	faHouse,
	faChartLine,
	faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';

import styles from "./Nav.module.css";

export default function Nav() {
  const cart = useSelector((state) => state.cart)
  let number = showingNumberCart();
  useEffect(() => {
    console.log(number)
  }, [number])
  
  const history = useHistory();

	function handleGoBack(e) {
		e.preventDefault();
		history.goBack();
	}
  
  const products = useSelector((state) => state.products);
  return (
    <div className={styles.container}>
      <button onClick={(e) => handleGoBack(e)}>
				<FontAwesomeIcon icon={faRotateLeft} />
			</button>
      <NavLink
        to="/home"
        exact
        activeClassName={styles.active}
        className={styles.title}
      >
        <FontAwesomeIcon className={styles.icons} icon={faHouse} /> Home
      </NavLink>
      {!!products.length && (
        <>
          <NavLink
            to="/AdminDashBoard"
            activeClassName={styles.active}
            className={styles.title}
          >
            <FontAwesomeIcon className={styles.icons} icon={faChartLine} />
            Dashboard
          </NavLink>
          {/* <NavLink
						to='/products'
						activeClassName={styles.active}
						className={styles.title}>
						<FontAwesomeIcon
							className={styles.icons}
							icon={faShirt}
						/>
						Products
					</NavLink> */}

          <NavLink
            to="/AddNewProduct"
            activeClassName={styles.active}
            className={styles.title}
          >
            <FontAwesomeIcon className={styles.icons} icon={faCirclePlus} />
            Add Products
          </NavLink>

          <NavLink
            to="/cart"
            activeClassName={styles.active}
            className={styles.title}
          >
            <div className={styles.containerAdvise}>
              <p className={styles.itemsNumber}>{number}</p>
            </div>
            <FontAwesomeIcon className={styles.icons} icon={faCartShopping} />
            Cart
          </NavLink>
        </>
      )}
    </div>
  );
}
