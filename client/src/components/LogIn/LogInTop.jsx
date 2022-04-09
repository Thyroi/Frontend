import React from 'react';
import { Link } from 'react-router-dom';

import styles from './LoginTop.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser  } from "@fortawesome/free-solid-svg-icons";

function LogInTop() {
	return (
		<div className={styles.loginContainer}>
			<Link className={styles.text} to='/LogIn'>LogIn</Link>
      <FontAwesomeIcon icon={faCircleUser} className={styles.icon} />
		</div>
	);
}

export default LogInTop;
