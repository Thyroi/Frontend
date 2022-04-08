import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardCategory.module.css';

function CardCategory({ img, name }) {
	return (
		<div className={styles.container}>
			<div className={styles.background}>
				<img src={img} alt='' />
			</div>

			<Link
				className={styles.title}
				to={name === 'All' ? '/products' : `/category?name=${name}`}>
				{name}
			</Link>

			<div className={styles.products}>show relevant products here</div>
		</div>
	);
}

export default CardCategory;
