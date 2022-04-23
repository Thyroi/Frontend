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
				to={name === 'All' ? '/home' : `/home?collection=${id}&name=${name}`}>
				<p className={styles.text}>{name}</p>
				<p className={styles.textDescription}>{`Click in this section in order to know ${name} Clothe we have on Posh Boutique`}</p>
			</Link>

			{/* <div className={styles.products}></div> */}
		</div>
	);
}

export default CardCategory;
