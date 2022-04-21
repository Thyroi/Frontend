import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './Card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

export default function Card({ data }) {
	const collections = useSelector((state) => state.collections);

	const {
		id_product,
		name,
		price,
		price_offer,
		brand,
		rating,
		collection,
		is_offer,
		default_image,
		variants,
	} = data;

	function showRating() {
		let stars = [];
		for (let i = 1; i <= Math.floor(rating); i++) {
			stars.push(<FontAwesomeIcon key={i} icon={faStar} />);
		}
		if (stars.length < 5) {
			if (rating - Math.floor(rating) > 0.2) {
				stars.push(
					rating - Math.floor(rating) < 0.7 ? (
						<FontAwesomeIcon key={99} icon={faStarHalfStroke} />
					) : (
						<FontAwesomeIcon key={99} icon={faStar} />
					)
				);
			} else {
				stars.length === 0 &&
					stars.push(
						<FontAwesomeIcon key={99} icon={faStarHalfStroke} />
					);
			}
		}
		return stars.slice(0, 5);
	}

	const collection_name = collections
		?.filter((c) => {
			return c?.id === collection;
		})
		.pop()?.name;

	let stocks = 0;
	variants?.forEach((v) =>
		Object.values(v.Stocks).forEach((s) => (stocks += s))
	);

	return (
		<div className={style.container}>
			<div className={style.background}>
				<Link
					className={style.linkedImage}
					to={`/products/${stocks ? id_product : ''}`}>
					{is_offer && (
						<span className={style.offer}>{`-%${
							(100 * (price - price_offer)) / price
						}`}</span>
					)}
					<img
						src={default_image}
						alt=''
						className={stocks === 0 ? style.noStock : style.image}
					/>
				</Link>
			</div>
			<div className={style.info}>
				<div className={style.name}>{name}</div>
				<div className={style.brand}>
					<span>{brand}</span>
					<span>{collection_name}</span>
					<span style={{ color: '#e4687c' }}>{showRating()}</span>
				</div>
				<div className={style.price}>{`$${price}`}</div>
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
