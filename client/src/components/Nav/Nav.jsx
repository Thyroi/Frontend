import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

export default function Nav() {
	return (
		<div className={styles.container}>
			<div className={styles.link}>
				<NavLink to='/' exact activeClassName={styles.active}>
					🏠 Home
				</NavLink>
			</div>
			<div className={styles.link}>
				<NavLink to='/Products' activeClassName={styles.active}>
					👕 Products
				</NavLink>
			</div>
			<div className={styles.link}>
				<NavLink to='/AddNewProduct' activeClassName={styles.active}>
					➕ Add Products
				</NavLink>
			</div>
		</div>
	);
}
