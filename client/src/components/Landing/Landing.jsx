import React from 'react';
import CardCategory from '../CardCategory/CardCategory';
import styles from './Landing.module.css';

export default function Landing() {
	let categories = [
		{ id: 0, img: 'img0', name: 'Summer' },
		{ id: 1, img: 'img1', name: 'Autumn' },
		{ id: 2, img: 'img2', name: 'Winter' },
		{ id: 3, img: 'img3', name: 'Spring' },
	];

	return (
		<div className={styles.container}>
			{categories.map(({ id, img, name }) => {
				return <CardCategory key={id} name={name} img={img} />;
			})}
		</div>
	);
}
