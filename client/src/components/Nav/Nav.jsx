import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

export default function Nav() {
	return (
		<div className={styles.container}>
			<div className={styles.link}>
				<NavLink to='/'>🏠 Home</NavLink>
			</div>
			<div className={styles.link}>
				<NavLink to='/Products'>👕 Products</NavLink>
			</div>
			<div className={styles.link}>
				<NavLink to='/AddNewProduct'>➕ Add Products</NavLink>
			</div>
		</div>
	);
}
