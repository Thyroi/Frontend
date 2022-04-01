import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

export default function Card({ data }) {
	let stocks =
		'Units: 20'; /* stocks debería sumar todos los stocks de todos los talles y eso... */

	const {
		id_product,
		name,
		price,
		brand,
		is_offer,
		default_image,
		variants,
	} = data;

	return (
		<div className={style.container}>
			<Link to={`/detail/${id_product}`}>
				<div className={style.background}>
					{is_offer && (
						<span className={style.offer}>{'Oferta'}</span>
					)}
					<img src={default_image} alt='' />
				</div>
			</Link>
			<div className={style.info}>
				<div className={style.name}>{name}</div>

				<div className={style.brand}>{brand}</div>

				<div className={style.price}>{price}</div>

				{/* falta colección que no está aún en el json creo */}

				<div className={style.stock}>{stocks}</div>
			</div>
		</div>
	);
}
