import React from 'react';
import CardCategory from '../CardCategory/CardCategory';
import styles from './Landing.module.css';

export default function Landing() {
	let categories = [
		{
			id: 0,
			img: 'https://media.cntraveler.com/photos/61eae29a14715b6c92bc1dd1/master/w_1600%2Cc_limit/Maldives_GettyImages-686525938.jpg',
			name: 'Summer',
		},
		{
			id: 1,
			img: 'https://cdn.britannica.com/88/137188-050-8C779D64/Boston-Public-Garden.jpg',
			name: 'Autumn',
		},
		{
			id: 2,
			img: 'https://thumbs.dreamstime.com/b/winter-mountain-landscape-clear-blue-sky-over-snowy-mountain-peaks-frosty-morning-winter-sunrise-mountains-christmas-131610926.jpg',
			name: 'Winter',
		},
		{
			id: 3,
			img: 'https://479g5s2lzyvpzbbe4encn113-wpengine.netdna-ssl.com/triangle/wp-content/uploads/sites/61/2019/03/spring-allergie.jpg',
			name: 'Spring',
		},
		{
			id: 4,
			img: 'https://i.pinimg.com/originals/65/5a/ef/655aefa16482ad8604e5c34b93de9cf4.jpg',
			name: 'All',
		},
	];

	return (
		<div className={styles.container}>
			{categories.map(({ id, img, name }) => {
				return <CardCategory key={id} name={name} img={img} />;
			})}
		</div>
	);
}
