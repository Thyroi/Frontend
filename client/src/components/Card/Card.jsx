import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

export default function Card({ data }) {
	/* const stocks = Object.entries(variants[0].stocks); */

	const {
		id_product,
		name,
		price,
		brand,
		is_offer,
		default_image,
		variants,
	} = data;

	const stocks = Object.entries(variants);

	return (
		<div className={style.container}>
			<Link to={`/detail/${id_product}`}>
				<div className={style.background}>
					<span>{is_offer && 'oferta'}</span>
					<img src={default_image} alt='' />
				</div>
			</Link>
			<div className={style.info}>
				<span>{name}</span>

				<span>{brand}</span>

				<span>{price}</span>

				<span>
					{stocks?.map((s) => {
						return <div>{`${s[0]}: ${s[1]}`}</div>;
					})}
				</span>
			</div>
		</div>
	);
}
