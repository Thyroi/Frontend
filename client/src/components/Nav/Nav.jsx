import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	
	faCartShopping,
	faCirclePlus,
	faHouse,
	faChartLine,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Nav.module.css';

export default function Nav() {
	const products = useSelector((state) => state.products);
	return (
		<div className={styles.container}>
			<NavLink
				to='/home'
				exact
				activeClassName={styles.active}
				className={styles.title}>
				<FontAwesomeIcon className={styles.icons} icon={faHouse} /> Home
			</NavLink>
			{!!products.length && (
				<>
					<NavLink
						to='/AdminDashBoard'
						activeClassName={styles.active}
						className={styles.title}>
						<FontAwesomeIcon
							className={styles.icons}
							icon={faChartLine}
						/>
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
						to='/AddNewProduct'
						activeClassName={styles.active}
						className={styles.title}>
						<FontAwesomeIcon
							className={styles.icons}
							icon={faCirclePlus}
						/>
						Add Products
					</NavLink>

					<NavLink
						to='/cart'
						activeClassName={styles.active}
						className={styles.title}>
						<FontAwesomeIcon
							className={styles.icons}
							icon={faCartShopping}
						/>
						Cart
					</NavLink>
				</>
			)}
		</div>
	);
}
