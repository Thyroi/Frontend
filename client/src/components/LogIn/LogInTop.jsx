import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearCart, logOutUser } from '../../actions';

import styles from './LoginTop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function LogInTop() {
	const dispatch = useDispatch();
	let history= useHistory();

	const { login_name, name } = useSelector((state) => state?.loggedInClient);

	function handleLogOut(e) {
		e.preventDefault();
		dispatch(logOutUser());
		dispatch(clearCart());
		alert('logged out');
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
				<FontAwesomeIcon icon={faCircleUser} className={styles.icon} />
			</div>

			{login_name ? (
				<div className={styles.dropdown}>
					<Link to='/client/profile'>Profile</Link>
					<button onClick={handleLogOut}>Log out</button>
				</div>
			) : (
				<div className={styles.dropdown}>
					<Link to='/login'>Client Log in/Sign up</Link>
					<Link to='/login'>Admin Log in</Link>
				</div>
			)}
		</div>
	);
}

export default LogInTop;
