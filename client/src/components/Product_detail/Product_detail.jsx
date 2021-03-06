import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';

import Quantity from '../Quantity/Quantity';
import Loader from '../Loader/Loader';
import style from './Product_detail.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCartShopping,
	faHeart,
	faStar,
} from '@fortawesome/free-solid-svg-icons';
import swal from '@sweetalert/with-react';

import {
	selectImage,
	productColor,
	productSizes,
	selectVariant,
	selectSize,
	prepareProduct,
	formattingProduct,
} from '../../utils/utils';

//Data
import {
	getById,
	addCart,
	selectingProduct,
	createList,
	getUserLists,
	updateList,
	getSpecificList,
	clearDiscount,
} from '../../actions/index';

import Dropdown from '../Dropdown/Dropdown';

export default function Product_detail() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const params = useHistory();

	const templateProduct = useSelector((state) => state.details);
	const loggedInAdmin = useSelector((state) => state.loggedInAdmin);
	let product = useSelector((state) => state.detailEdited);

	const cartProducts = useSelector((state) => state.cart);
	const client = useSelector((state) => state.loggedInClient);
	const lists = useSelector((state) => state.lists);
	const favorite = useSelector((state) => state.specificlist);

	const { name, brand, price, description } = product;

	const [state, setState] = useState();

	useEffect(() => {
		dispatch(getById(id));
		dispatch(clearDiscount());
	}, []);

	useEffect(() => {
		if (product?.variants) {
			const newProduct = Object.assign(
				{},
				formattingProduct(product, templateProduct)
			);
			dispatch(selectingProduct(newProduct));
		}
	}, [product?.price]);

	useEffect(() => {}, [product && product?.variants]);
	//
	useEffect(() => {
		dispatch(getUserLists(client?.phone));
		dispatch(getSpecificList(client.phone, 'Favorite'));
	}, [dispatch]);

	function opt() {
		let nuevo = [];
		for (var i = 0; i < lists?.length; i++) {
			if (lists[i].title === 'Favorite') {
			} else {
				nuevo = [...nuevo, { id: lists[i].id, name: lists[i].title }];
			}
		}
		return nuevo;
	}

	async function handleLists(e) {
		e.preventDefault();
		if (client?.phone) {
			if (e.target.value == 0) {
				// CREACION DE NUEVA LISTA
				const listName = await swal({
					text: 'List name',
					content: 'input',
					button: 'OK',
				});
				if (
					listName === 'Favorite' ||
					listName === 'Favourite' ||
					listName === 'Favourites' ||
					listName === 'Favorites' ||
					listName === 'Favorito' ||
					listName === 'Favoritos' ||
					listName === 'favorite' ||
					listName === 'favourite' ||
					listName === 'favourites' ||
					listName === 'favorites' ||
					listName === 'favorito' ||
					listName === 'favoritos' ||
					listName === 'favorita' ||
					listName === 'favoritas' ||
					listName === 'Favoritas' ||
					listName === 'Favorita'
				) {
					swal(
						'Product added to your list',
						'Click to continue!',
						'warning'
					);
				} else if (listName) {
					const newList = {
						ClientPhone: client.phone,
						rList: [parseInt(id)],
						Colaborators: [],
						title: listName,
					};
					dispatch(createList(newList, swal));
					setTimeout(() => {
						dispatch(getUserLists(client.phone));
					}, 1000);
				}
			} else {
				const updated = lists.find((l) => l.id == e.target.value);
				if (
					updated?.List.map((p) => p.id_product).includes(
						parseInt(id)
					)
				) {
					swal(
						'This product already is on this list!',
						'Click to continue!',
						'warning'
					);
					return;
				} else {
					if (updated) {
						const listUpdated = {
							id: updated?.id,
							ClientPhone: parseInt(updated?.ClientPhone),
							rList: [
								...updated?.List.map((p) => p.id_product),
								parseInt(id),
							],
							Colaborators: [...updated.Colaborators.map((c) => parseInt(c.phone))],
							title: updated?.title,
						};
						dispatch(updateList(listUpdated));
						swal('Product added!', 'Click to continue!', 'success');
					}
				}
			}
		} else {
			swal({
				title: 'You have to be logged in to add lists',
				text: 'Would you like to login?',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			}).then((willAccept) => {
				if (willAccept) {
					prepareProduct(product);
					params.push('/login');
				} else {
				}
			});
		}
	}

	function handleFavorites(e) {
		e.preventDefault();
		if (client?.phone) {
			if (favorite.length) {
				console.log(favorite);
				if (
					favorite[0]?.List?.map((p) =>
						parseInt(p.id_product)
					).includes(parseInt(id))
				) {
					swal(
						'This product already is on favorites',
						'Click to continue!',
						'warning'
					);
				} else {
					const listUpdated = {
						id: favorite[0]?.id,
						ClientPhone: parseInt(favorite[0]?.ClientPhone),
						rList: [
							...favorite[0]?.List?.map((p) => p.id_product),
							parseInt(id),
						],
						Colaborators: [...favorite[0].Colaborators],
						title: favorite[0]?.title,
					};
					dispatch(updateList(listUpdated));
					swal(
						'Product added to your list',
						'Click to continue!',
						'success'
					);
				}
			} else {
				const newList = {
					ClientPhone: client.phone,
					rList: [parseInt(id)],
					Colaborators: [],
					title: 'Favorite',
				};
				dispatch(createList(newList, swal));
			}
		} else {
			swal({
				title: 'You have to be logged in to add products',
				text: 'Would you like to login?',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			}).then((willAccept) => {
				if (willAccept) {
					prepareProduct(product);
					params.push('/login');
				} else {
				}
			});
		}
	}

	if (!product?.variants) return <Loader />;
	console.log(product);
	return (
		<div className={style.newContainer}>
			<div className={style.container}>
				<div className={style.containerImages}>
					<div className={style.containerMainImage}>
						{product?.is_offer && (
							<span className={style.offer}>{`-${parseFloat(
								(100 * (-product.price + product.price_offer)) /
								product.price
							).toFixed(0)}%`}</span>
						)}
						<img
							className={style.mainImage}
							src={
								product?.variants &&
								product?.variants[0]?.ProductImages[0]
							}
							id='default_image'
							alt=''
						/>
					</div>
					<div className={style.containerSecondImages}>
						{product?.variants &&
							product?.variants[0]?.ProductImages.map((image) => (
								<img
									key={image}
									className={style.secondImages}
									src={image}
									alt=''
									onClick={() => {
										selectImage(image);
									}}
								/>
							))}
					</div>
				</div>

				<div className={style.containerInf}>
					<div className={style.specificInf}>
						<h2 className={style.productName}>{name}</h2>
						<p className={style.collectionName}>{brand}</p>
						<p
							className={style.productPrice}
							id='individualProductPrice'>{`$${
							(product?.totalPrice) || parseFloat(product?.price).toFixed(2)
						}`}</p>

						<div className={style.containerPreferences}>
							<div className={style.containerSizePreference}>
								<h3 className={style.sizeHeader}>Size</h3>
								<div className={style.sizes} id='sizes'>
									{product?.variants &&
										productSizes(templateProduct).map(
											(size) => (
												<div
													id={size}
													key={size}
													className={style.size}
													onClick={() => {
														const result =
															Object.assign(
																{},
																selectSize(
																	templateProduct,
																	product,
																	size
																)
															);
														dispatch(
															selectingProduct(
																result
															)
														);
													}}>
													{size}
												</div>
											)
										)}
								</div>
							</div>

							<div className={style.containerColorPreference}>
								<h3 className={style.colorHeader}>Color</h3>
								<div className={style.colors} id='colors'>
									{productColor(templateProduct).map(
										(color) => (
											<div
												id={color}
												key={color}
												className={style.color}
												onClick={() => {
													const result =
														Object.assign(
															{},
															selectVariant(
																templateProduct,
																product,
																color
															)
														);
													dispatch(
														selectingProduct(result)
													);
												}}>
												{color}
											</div>
										)
									)}
								</div>
							</div>

							<div className={style.containerAmountFavorite}>
								<Quantity product={product} />
								{!loggedInAdmin.user_name && (
									<div className={style.favorite}>
										<FontAwesomeIcon
											className={style.favoriteIcon}
											icon={faHeart}
											onClick={handleFavorites}
										/>
									</div>
								)}
							</div>

							{!loggedInAdmin.user_name && (
								<div className={style.containerBuyCart}>
									<Link
										className={style.buyButton}
										onClick={() => {
											/* swal({
											title: 'You have to be logged in to buy',
											text: 'Would you like to login?',
											icon: 'warning',
											buttons: true,
											dangerMode: true,
										}).then((willAccept) => {
											if (willAccept) { */
											prepareProduct(product);
											params.push('/form');
											/* } else {
											}
										}); */
										}}>
										<button className={style.buyLetter}>
											Buy
										</button>
									</Link>
									<button
										className={style.cartButton}
										id='addCartButton'
										onClick={() => {
											addCart(
												cartProducts,
												product,
												dispatch
											);
											swal(
												'Product added to cart',
												'Click to continue!',
												'success'
											);
										}}>
										<FontAwesomeIcon
											className={style.cartIcon}
											icon={faCartShopping}
										/>
									</button>
								</div>
							)}
							{loggedInAdmin.user_name && (
								<div className={style.containerBuyCart}>
									<Link to={`/updateProducto/${id}`}>
										<button className={style.buyButton}>
											Update product
										</button>
									</Link>
								</div>
							)}
							<div className={style.containerUnits}>
								<p className={style.infoUnits}>
									Available Units:{' '}
									<span className={style.units}>
										{product?.variants[0]?.leftUnits}
									</span>
								</p>
							</div>
							{!loggedInAdmin.user_name && (
								<div className={style.wishList}>
									<Dropdown
										placeHolder={'Add to your wishlist'}
										options={[
											...opt(),
											{
												id: 0,
												name: '+ New List',
											},
										]}
										handler={handleLists}
									/>
								</div>
							)}
						</div>
					</div>

					<div className={style.generalInformation}>
						<h4 className={style.headerDescription}>Description</h4>
						<hr className={style.line} />
						<p className={style.description}>{description}</p>
					</div>
				</div>
			</div>

			<div className={style.containerReviews}>
				{product.reviewsText &&
					product?.reviewsText.map((review) => {
						let { description } = review;
						let { login_name } = review.Client;
						let stars = Array.from(Array(review.stars).keys());

						return (
							<div className={style.containerReview}>
								<img
									className={style.profile}
									src='https://prephoopsnext.com/wp-content/themes/prepsports/resources/assets/images/default-user.png'
								/>
								<div className={style.contentReview}>
									<div className={style.containerStars}>
										{stars.map((star) => {
											return (
												<FontAwesomeIcon
													className={style.star}
													icon={faStar}
												/>
											);
										})}
									</div>
									<h3 className={style.login_nameReviewer}>
										{login_name}
									</h3>
									<p className={style.textReview}>
										{description}
									</p>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
}
