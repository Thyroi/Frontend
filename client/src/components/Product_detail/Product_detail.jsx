import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Quantity from '../Quantity/Quantity';

import style from './Product_detail.module.scss';
import {useSelector, useDispatch} from 'react-redux'

//Data
import data from '../../Assets/Products.json';
import { getById, addCart } from '../../actions/index';

// Waiting for routes and data to deploy it finally

export default function Product_detail() {
	const { id } = useParams();
	
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(getById(id))
	},[dispatch])
	/* const producto = data.find((p) => p.id_product == id);
	const { variants } = producto; */

	const product = useSelector((state) => state.details)
	const { default_image, name, variants, brand, price, description } = product;
	
  const cartProducts = useSelector(state => state.cart);

	return (
		<div className={style.container}>
			<div className={style.containerImages}>
				<div className={style.containerMainImage}>
					<img className={style.mainImage} src={default_image} />
				</div>
				<div className={style.containerSecondImages}>
					{variants && variants[0].ProductImages.map((image) => (
						<img
							key={image}
							className={style.secondImages}
							src={image}
							alt=''
						/>
					))}
				</div>
			</div>

			<div className={style.containerInf}>
				<div className={style.specificInf}>
					<h2 className={style.productName}>{name}</h2>
					<p className={style.collectionName}>{brand}</p>
					<p className={style.productPrice}>{`$${price}`}</p>
					<div className={style.containerPreferences}>
						<div className={style.containerSizePreference}>
							<h3 className={style.sizeHeader}>Size</h3>
							<div className={style.sizes}>
								<div className={style.size}>S</div>
								<div className={style.size}>M</div>
								<div className={style.size}>L</div>
								<div className={style.size}>xL</div>
							</div>
						</div>

						<div className={style.containerColorPreference}>
							<h3 className={style.colorHeader}>Color</h3>
							<div className={style.colors}>
								<div className={style.color}>blue</div>
								<div className={style.color}>red</div>
								<div className={style.color}>black</div>
								<div className={style.color}>green</div>
							</div>
						</div>

						<div className={style.containerAmountFavorite}>
							<Quantity />
							<div className={style.favorite}>
								<img
									className={style.favoriteImg}
									src=''
									alt='favorite'
								/>
							</div>
						</div>

						<div className={style.containerBuyCart}>
							<button className={style.buyButton}>Buy</button>
							<button className={style.cartButton} id="addCartButton" onClick={()=> addCart(cartProducts,product, dispatch)}>
								<img src='' alt='' />
							</button>
						</div>
						<div className={style.containerUnits}>
							<p className={style.infoUnits}>
								Available Units:{' '}
								<span className={style.units}>58</span>
							</p>
						</div>
					</div>
				</div>

				<div className={style.generalInformation}>
					<h4 className={style.headerDescription}>Description</h4>
					<hr className={style.line} />
					<p className={style.description}>{description}</p>
				</div>
			</div>
		</div>
	);
}


