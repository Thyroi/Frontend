import React from 'react';
import CardCategory from '../CardCategory/CardCategory';
import styles from './Landing.module.css';

export default function Landing() {
	let collections = [
		{
			id: 2,
			img: 'https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--Women_SpringEscape_FW22_Drop1_LOOK01_VISUAL4.png?wid=824&hei=824',
			name: 'Summer',
		},
		{
			id: 3,
			img: 'https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--Women_SpringEscape_FW22_Drop1_LOOK01_VISUAL4.png?wid=824&hei=824',
			name: 'Autumn',
		},
		{
			id: 4,
			img: 'https://www.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton--BC_DAY-BREAK_1680x3360_LVCOM_2.jpg?wid=656',
			name: 'Winter',
		},
		{
			id: 1,
			img: 'https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-polochon-other-leathers-bags--M59927_PM1_Worn%20view.png?wid=2048&hei=2048',
			name: 'Spring',
		},
		{
			id: 0,
			img: 'https://s3.envato.com/files/335455718/160_1R3A9771.jpg',
			name: 'All',
		},
	];

	return (
		<div className={styles.container}>
			{collections.map(({ id, img, name }) => {
				return <CardCategory key={id} id={id} name={name} img={img} />;
			})}
		</div>
	);
}
