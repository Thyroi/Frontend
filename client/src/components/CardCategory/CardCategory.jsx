import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardCategory.module.css';

function CardCategory({ img, name, id }) {
	return (
		<div className={styles.container}>
			<div className={styles.background}>
				<img className={styles.image} src={img} alt='' />
			</div>

			<Link
				className={styles.title}
				to={
					name === 'All' ? '/products' : `/products?collection=${id}`
				}>
				{name}
			</Link>

			{/* <div className={styles.products}></div> */}
		</div>
	);
}

export default CardCategory;
