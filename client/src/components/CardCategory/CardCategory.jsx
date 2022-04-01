import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardCategory.module.css';

function CardCategory({ img, name }) {
	return (
		<div className={styles.container}>
			{/* en la class padre voy a poner la img de background */}
			<div>
				<Link to={`/category?name=${name}`}>{name}</Link>
			</div>
		</div>
	);
}

export default CardCategory;
