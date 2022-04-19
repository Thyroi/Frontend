import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Offers.module.css';
import Products from '../../Assets/Products.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { setNewOffer } from '../../utils/utils';

function Offers() {
	const allproducts = Products;

	/* useSelector((state) => state.allproducts);
	 */
	const [active, setActive] = useState({
		Mon: false,
		Tue: false,
		Wed: false,
		Thu: false,
		Fri: false,
		Sat: false,
		Sun: false,
	});

	const [itemsOnOffer, setItemsOnOffer] = useState([]);

	const [discount, setDiscount] = useState(0);

	function handleClick(e) {
		e.preventDefault();
		const { name } = e.target;
		setActive({ ...active, [name]: !active[name] });
	}

	function handleSend(e) {
		e.preventDefault();
		setNewOffer({ discount: discount, ids: itemsOnOffer });
		setDiscount(0);

		setActive({
			Mon: false,
			Tue: false,
			Wed: false,
			Thu: false,
			Fri: false,
			Sat: false,
			Sun: false,
		});

		itemsOnOffer.forEach((id) => {
			document.getElementById(id).classList.remove(styles.selected);
			document.getElementById(id).classList.add(styles.unselected);
		});

		setItemsOnOffer([]);
	}

	function handleItemsOnOffer(e) {
		e.preventDefault();

		if (itemsOnOffer.includes(e.target.value)) {
			setItemsOnOffer(
				(prev) => (prev = prev.filter((id) => id !== e.target.value))
			);
			document
				.getElementById(e.target.value)
				.classList.remove(styles.selected);
			document
				.getElementById(e.target.value)
				.classList.add(styles.unselected);
		} else {
			setItemsOnOffer((prev) => [...prev, e.target.value]);

			document
				.getElementById(e.target.value)
				.classList.remove(styles.unselected);
			document
				.getElementById(e.target.value)
				.classList.add(styles.selected);
		}
	}

	return (
		<div className={styles.container}>
			<h2>Offers</h2>
			<div className={styles.content}>
				<div className={styles.options}>
					<div className={styles.days}>
						<button
							className={
								active.Mon ? styles.active : styles.button
							}
							onClick={handleClick}
							name='Mon'>
							Mon
						</button>
						<button
							className={
								active.Tue ? styles.active : styles.button
							}
							onClick={handleClick}
							name='Tue'>
							Tue
						</button>
						<button
							className={
								active.Wed ? styles.active : styles.button
							}
							onClick={handleClick}
							name='Wed'>
							Wed
						</button>
						<button
							className={
								active.Thu ? styles.active : styles.button
							}
							onClick={handleClick}
							name='Thu'>
							Thu
						</button>
						<button
							className={
								active.Fri ? styles.active : styles.button
							}
							onClick={handleClick}
							name='Fri'>
							Fri
						</button>
						<button
							className={
								active.Sat ? styles.active : styles.button
							}
							onClick={handleClick}
							name='Sat'>
							Sat
						</button>
						<button
							className={
								active.Sun ? styles.active : styles.button
							}
							onClick={handleClick}
							name='Sun'>
							Sun
						</button>
					</div>
					<div className={styles.discount}>
						<label>Discount % between 1 and 99</label>
						<input
							type='number'
							min='1'
							max='99'
							value={discount}
							onChange={(e) => {
								e.preventDefault();
								setDiscount(parseInt(e.target.value));
							}}
						/>
					</div>
					<button className={styles.send} onClick={handleSend}>
						Send
					</button>
				</div>
				<div className={styles.cards}>
					{allproducts?.map(
						({ name, price, variants, id_product }) => {
							let stocks = 0;
							variants?.forEach((v) =>
								Object.values(v.Stocks).forEach(
									(s) => (stocks += s)
								)
							);
							return (
								<div
									key={id_product}
									className={styles.itemContainer}>
									<FontAwesomeIcon
										id={id_product}
										icon={faSquareCheck}
										className={styles.unselected}
									/>
									<div className={styles.imgContainer}>
										<Link to={`/detail/${id_product}`}>
											<img
												className={styles.productImage}
												src={
													variants[0].ProductImages[0]
												}
												alt='iconOff'
											/>
										</Link>
									</div>

									<div className={styles.infoContainer}>
										<button
											value={id_product}
											onClick={(e) =>
												handleItemsOnOffer(e)
											}>
											{name}
										</button>
										<div className={styles.infoFooter}>
											<span>{`Stocks: ${stocks}`}</span>
											<span>{`$${price}`}</span>
										</div>
									</div>
								</div>
							);
						}
					)}
				</div>
			</div>
		</div>
	);
}

export default Offers;
