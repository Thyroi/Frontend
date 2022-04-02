import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

export default function Card({ data }) {
	const {
		id_product,
		name,
		price,
		brand,
		is_offer,
		default_image,
		variants,
	} = data;

	let stocks = 0;
	variants.forEach((v) =>
		Object.values(v.Stocks).forEach((s) => (stocks += s))
	);

	return (
		<div className={style.container}>
			<div className={style.background}>
				<Link to={`/detail/${id_product}`}>
					{is_offer && (
						<span className={style.offer}>{'Oferta'}</span>
					)}
					<img src={default_image} alt='' />
				</Link>
			</div>
			<div className={style.info}>
				<div className={style.name}>{name}</div>
				<div className={style.brand}>{brand}</div>
				<div className={style.price}>{`$${price}`}</div>
				{/* falta colección que no está aún en el json creo */}
				<div className={style.stock}>{`Units: ${stocks}`}</div>
			</div>
		</div>
	);
}
