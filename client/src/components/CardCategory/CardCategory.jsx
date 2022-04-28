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
					name === 'All'
						? '/home'
						: `/home?collection=${id}&name=${name}`
				}>
				<p className={styles.text}>{name}</p>
				<p className={styles.textDescription}>
					{name === 'All'
						? 'Click to see all products!'
						: `Click to see the ${name} collection!`}
				</p>
			</Link>
		</div>
	);
}

export default CardCategory;
