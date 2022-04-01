import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardCategory.module.css';

function CardCategory({ img, name }) {
	return (
		<div className={styles.container}>
			<div className={styles.background}>
				<img src={img} alt='' />
			</div>
			<div className={styles.title}>
				<Link to={`/category?name=${name}`}>{name}</Link>
			</div>
		</div>
	);
}

export default CardCategory;
