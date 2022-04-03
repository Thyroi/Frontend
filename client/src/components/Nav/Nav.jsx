import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

export default function Nav() {
	return (
		<div className={styles.container}>
			<NavLink
				to='/'
				exact
				activeClassName={styles.active}
				className={styles.title}>
				Home
			</NavLink>
			<NavLink
				to='/Products'
				activeClassName={styles.active}
				className={styles.title}>
				Products
			</NavLink>
			<NavLink
				to='/AddNewProduct'
				activeClassName={styles.active}
				className={styles.title}>
				Add Products
			</NavLink>
      <NavLink
				to='/Cart'
				activeClassName={styles.active}
				className={styles.title}>
				Cart
			</NavLink>
		</div>
	);
}
