import React from 'react';
import CardCategory from '../CardCategory/CardCategory';
import styles from './Landing.module.css';

export default function Landing() {
	let categories = [
		{
			id: 0,
			img: 'https://d3ugyf2ht6aenh.cloudfront.net/stores/721/837/products/20201111_1705151-cee01b48556482841516052164004281-640-0.jpg',
			name: 'Summer',
		},
		{
			id: 1,
			img: 'https://www.ubuy.com.bh/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNzEzS0VpTE50Q0wuX0FDX1VMMTUwMF8uanBn.jpg',
			name: 'Autumn',
		},
		{
			id: 2,
			img: 'https://m.media-amazon.com/images/I/7181mldnipL._AC_UX342_.jpg',
			name: 'Winter',
		},
		{
			id: 3,
			img: 'https://www.review-australia.com/dw/image/v2/BBBB_PRD/on/demandware.static/-/Sites-review-master-catalog/default/dw495fda72/images/RE20DR323_REGRN087_5.jpg',
			name: 'Spring',
		},
		{
			id: 4,
			img: 'https://s3.envato.com/files/335455718/160_1R3A9771.jpg',
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
