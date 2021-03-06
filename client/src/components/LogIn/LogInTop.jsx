import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearCart, logOutUser } from '../../actions';

import styles from './LoginTop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { saveCart } from '../../utils/utils';

function LogInTop() {
	const dispatch = useDispatch();
	let history = useHistory();

	const { login_name, name, phone } = useSelector(
		(state) => state.loggedInClient
	);
	const { user_name, rol } = useSelector((state) => state.loggedInAdmin);

	const cart = JSON.parse(localStorage.getItem('cart')) || [];

	function handleLogOut(e) {
		e.preventDefault();

		saveCart(phone, cart);
		dispatch(logOutUser());



		dispatch(clearCart());

		history.push('/home');
	}

	return (
		<div className={styles.loginContainer}>
			<div className={styles.text}>
				{login_name && (
					<div className={styles.userDisplay}>
						<div>{login_name}</div>
						<div>{`Hola, ${name}!`}</div>
					</div>
				)}
				{user_name && (
					<div className={styles.userDisplay}>
						<div>{rol}</div>
						<div>{`Hola, ${user_name}!`}</div>
					</div>
				)}
				<FontAwesomeIcon icon={faCircleUser} className={styles.icon} />
			</div>

			{login_name ? (
				<div className={styles.dropdown}>
					<Link to='/client/profile'>Profile</Link>
					<button onClick={handleLogOut}>Log out</button>
				</div>
			) : user_name ? (
				<div className={styles.dropdown}>
					<button onClick={handleLogOut}>Log out</button>
				</div>
			) : (
				<div className={styles.dropdown}>
					<Link to='/login'>Client Log in/Sign up</Link>
					<Link to='/loginadmin'>Admin Log in</Link>
				</div>
			)}
		</div>
	);
}

export default LogInTop;
