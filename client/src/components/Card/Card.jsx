import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './Card.module.css';

export default function Card({ data }) {
	const collections = useSelector((state) => state.collections);

	const {
		id_product,
		name,
		price,
		brand,
		collection,
		is_offer,
		default_image,
		variants,
	} = data;

	const collection_name = collections
		?.filter((c) => {
			return c.id === collection;
		})
		.pop().name;

	let stocks = 0;
	variants?.forEach((v) =>
		Object.values(v.Stocks).forEach((s) => (stocks += s))
	);

	return (
		<div className={style.container}>
			<div className={style.background}>
				<Link to={`/products/${stocks ? id_product : ''}`}>
					{is_offer && <span className={style.offer}>{'SALE'}</span>}
					<img
						src={default_image}
						alt=''
						className={stocks === 0 ? style.noStock : undefined}
					/>
				</Link>
			</div>
			<div className={style.info}>
				<div className={style.name}>{name}</div>
				<div className={style.brand}>
					<span>{brand}</span>
					<span>{collection_name}</span>
					<span>{'rating'}</span>
				</div>
				<div className={style.price}>{`$${price}`}</div>
				{/* falta colección que no está aún en el json creo */}
				{stocks === 0 ? (
					<span
						style={{
							fontSize: '0.8rem',
							fontWeight: '800',
							color: 'red',
							margin: '0 0 0 1rem',
						}}>
						SOLD OUT
					</span>
				) : (
					<div className={style.stock}>
						<span>{`Units: `}</span>
						<span style={{ fontWeight: '800' }}>{stocks}</span>
					</div>
				)}
			</div>
		</div>
	);
}
