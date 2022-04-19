import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CardCategory from '../CardCategory/CardCategory';
import { cleanProducts, getInfo } from '../../actions';
import styles from './Landing.module.css';

export default function Landing() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getInfo())
		.then(() => dispatch(cleanProducts()))
	}, [dispatch]);

	let collections = [
		{
			id: 2,
			img: 'https://la.louisvuitton.com/content/dam/lv/online/stories/fashion/W_Fa_RW_Cruise_2022_v2.html/jcr:content/assets/looks/LV_CRUISE_22_LOOK_15.jpg?imwidth=656',
			name: 'Summer',
		},
		{
			id: 3,
			img: 'https://la.louisvuitton.com/content/dam/lv/online/stories/fashion/M_Fa_RW_Show_SS22_V2.html/jcr:content/assets/looks/Men_Show_SS22_Look_22.jpg?imwidth=656',
			name: 'Autumn',
		},
		{
			id: 4,
			img: 'https://la.louisvuitton.com/content/dam/lv/online/stories/fashion/M_Fa_RW_Show_SS22_V2.html/jcr:content/assets/looks/Men_Show_SS22_Look_42.jpg?imwidth=656',
			name: 'Winter',
		},
		{
			id: 1,
			img: 'https://la.louisvuitton.com/content/dam/lv/online/stories/fashion/W_Fa_RW_Cruise_2022_v2.html/jcr:content/assets/looks/LV_CRUISE_22_LOOK_20.jpg?imwidth=656',
			name: 'Spring',
		},
		{
			id: 0,
			img: 'https://i.ibb.co/LgH3Jk9/jhyj.png',
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
