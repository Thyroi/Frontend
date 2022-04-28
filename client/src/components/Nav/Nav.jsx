import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showingNumberCart } from '../../utils/utils';
import {
	faCartShopping,
	faHouse,
	faChartLine,
	faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Nav.module.css';

export default function Nav() {
	let number = showingNumberCart();
	useEffect(() => {}, [number]);

	const history = useHistory();

	function handleGoBack(e) {
		e.preventDefault();
		history.goBack();
	}

	const loggedInAdmin = useSelector((state) => state.loggedInAdmin);
	return (
		<div className={styles.container}>
			<button onClick={(e) => handleGoBack(e)}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</button>
			<NavLink
				to='/home'
				exact
				activeClassName={styles.active}
				className={styles.title}>
				<FontAwesomeIcon className={styles.icons} icon={faHouse} /> Home
			</NavLink>

			{loggedInAdmin?.user_name && (
				<NavLink
					to='/admindashboard'
					activeClassName={styles.active}
					className={styles.title}>
					<FontAwesomeIcon
						className={styles.icons}
						icon={faChartLine}
					/>
					Dashboard
				</NavLink>
			)}
			{!loggedInAdmin?.user_name && (
				<NavLink
					to='/cart'
					activeClassName={styles.active}
					className={styles.title}>
					<div className={styles.containerAdvise}>
						<p className={styles.itemsNumber}>{number}</p>
					</div>
					<FontAwesomeIcon
						className={styles.icons}
						icon={faCartShopping}
					/>
					Cart
				</NavLink>
			)}
		</div>
	);
}
