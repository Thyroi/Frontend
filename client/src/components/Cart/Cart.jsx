import React from 'react';
import style from './Cart.module.scss';

import Quantity from '../Quantity/Quantity';
import Loader from '../Loader/Loader';

import swal from '@sweetalert/with-react';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeCart } from '../../actions/index';
import { totalDue, prepareProduct } from '../../utils/utils';

// Add the context for showing the items

function Cart(params) {
	// Provisional remove this when context is implemented
	const itemsCart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	function handleNavigate(e) {
		e.preventDefault();
		params.history.push('/cart/pay');
	}

	if (!itemsCart) return <Loader />;

	return (
		<div className={style.containerCart}>
			{itemsCart &&
				itemsCart.map((item) => {
					const { name, totalPrice, variants, id_product } = item;
					return (
						<div
							key={item.id_product}
							className={style.itemContainer}>
							<div className={style.imgContainer}>
								{item.is_offer && (
									<span className={style.offer}>
										{'Oferta'}
									</span>
								)}

								<Link to={`/detail/${id_product}`}>
									<img
										className={style.productImage}
										src={variants[0].ProductImages[0]}
										alt='iconOff'
									/>
								</Link>
								{/* <img src="" alt="product" /> */}
							</div>

							<div className={style.infoContainer}>
								<div className={style.subInfoContainer}>
									<h3 className={style.nameProduct}>
										{name}
									</h3>
									<p
										className={style.productPrice}
										id='individualProductPrice'>{`$${totalPrice}`}</p>
									<p
										className={style.productPrice}
										id='individualProductPrice'>{`Color: ${item.variants[0].ColorName}`}</p>
									<p
										className={style.productPrice}
										id='individualProductPrice'>{`Size: ${
										Object.keys(item.variants[0].Stocks)[0]
									}`}</p>

									<Quantity product={item} />

									<div className={style.containerButtons}>
										<div
											className={style.containerDiscount}>
											<input
												className={style.inputDiscount}
												type='text'
												placeholder='Discount Code'
											/>
											<input
												className={style.applyDiscount}
												type='submit'
												value='Apply'
											/>
										</div>

										<button
											className={style.removeButton}
											onClick={() =>{
												dispatch(
													removeCart(itemsCart, item)
												);
                      swal("Product removed from cart", "Click to continue!", "success");
                      }
											}>
											<p>Remove</p>
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})}

			<div className={style.purchaseContainer}>
			
			<div
											className={style.containerDiscount}>
											<input
												className={style.inputDiscount}
												type='text'
												placeholder='Discount Code'
											/>
											<input
												className={style.applyDiscount}
												type='submit'
												value='Apply'
											/>
			</div>
				{!!itemsCart.length && (
					<p className={style.totalInfo}>
						Total due:{' '}
						<span
							className={style.totalPrice}
							id='total'>{`$${totalDue(null, itemsCart)}`}</span>
					</p>
				)}

				{!!itemsCart.length && (
					<Link to='/form' className={style.buyButton}>
						<button
							className={style.buyLetter}
							onClick={() => prepareProduct(null, itemsCart)}>
							Buy
						</button>
					</Link>
				)}
			</div>
		</div>
	);
}

export default Cart;
