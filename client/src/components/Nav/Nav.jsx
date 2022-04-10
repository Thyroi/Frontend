import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCartShopping,
	faCirclePlus,
	faHouse,
	faChartLine,
	faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Nav.module.css';

export default function Nav() {
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
