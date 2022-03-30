import React, { useEffect, useState } from 'react';
import styles from './AddNewProduct.module.css';

function AddNewProduct() {
	const [error, setError] = useState({});
	const [input, setInput] = useState({
		brand: '',
		type: '',
		collection: '',
		stock: '',
		price: '',
		img: 'https://media1.sistemacontinuo.com.ar/5289/remera-hombre-sublimable.jpg',
		description: '',
	});

	const validation = (input) => {
		let error = {};

		if (!input.brand) {
			error.brand = 'This field is mandatory';
		}
		if (!input.type) {
			error.type = 'This field is mandatory';
		}
		if (!input.collection) {
			error.collection = 'This field is mandatory';
		}
		if (input.stock < 1) {
			error.stock = 'You need more than one';
		}
		if (input.price < 1) {
			error.price = 'It should be more expensive';
		}
		if (!input.description) {
			error.price = 'This field is mandatory';
		}

		return error;
	};

	useEffect(() => {
		setError(validation(input));
	}, [input]);

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className={styles.AddProductContainer}>
			<form>
				<div className={styles.formProduct}>
					<div className={styles.branch}>
						<label>Branch</label>
						<input
							type='text'
							value={input.brand}
							name='brand'
							placeholder='Set Brand Name'
							autoComplete='off'
							className={styles.inputStyle}
							onChange={(e) => handleChange(e)}
						/>
						{error.brand && (
							<p className={styles.error}>{error.brand}</p>
						)}
					</div>
					<div className={styles.clothe}>
						<label>Clothe Type</label>
						<input
							type='text'
							value={input.type}
							name='type'
							placeholder='Set Type'
							autoComplete='off'
							className={styles.inputStyle}
							onChange={(e) => handleChange(e)}
						/>
						{error.type && (
							<p className={styles.error}>{error.type}</p>
						)}
					</div>
					<div className={styles.gender}>
						<select>
							<option value='all'>Sort by Gender</option>
							<option value='Female'>Female</option>
							<option value='Man'>Man</option>
							<option value='none'>Non Gender</option>
						</select>
					</div>
					<div className={styles.size}>
						<select>
							<option value='all'>Sort by Size</option>
							<option value='XS'>XS</option>
							<option value='S'>S</option>
							<option value='M'>M</option>
							<option value='L'>L</option>
							<option value='XL'>XL</option>
						</select>
					</div>
					<div className={styles.collection}>
						<label>Collection</label>
						<input
							type='text'
							value={input.collection}
							name='collection'
							placeholder='Set Collection'
							autoComplete='off'
							className={styles.inputStyle}
							onChange={(e) => handleChange(e)}></input>
						{error.collection && (
							<p className={styles.error}>{error.collection}</p>
						)}
					</div>
					<div className={styles.color}>
						<select>
							<option value='all'>Sort by Color</option>
							<option value='white'>white</option>
							<option value='black'>black</option>
							<option value='Pink'>Pink</option>
							<option value='Red'>Red</option>
							<option value='Blue'>Blue</option>
						</select>
					</div>
					<div className={styles.stock}>
						<label>Stock</label> {/*input */}
						<input
							type='number'
							value={input.stock}
							name='stock'
							placeholder='Set Stock'
							autoComplete='off'
							className={styles.inputStyle}
							onChange={(e) => handleChange(e)}></input>
						{error.stock && (
							<p className={styles.error}>{error.stock}</p>
						)}
					</div>
					<div className={styles.price}>
						<label>Price</label>
						<input
							type='number'
							value={input.price}
							name='price'
							placeholder='Set Price'
							autoComplete='off'
							onChange={(e) => handleChange(e)}
							className={styles.inputStyle}></input>
						{error.price && (
							<p className={styles.error}>{error.price}</p>
						)}
					</div>
					<div className={styles.offer}>
						<label>Offer Of</label>
						<input type='checkbox'></input>
					</div>
					<div className={styles.images}>
						<img src={input.img} alt='img' />
					</div>
					<div className={styles.textDescription}>
						<textarea
							onChange={(e) => handleChange(e)}
							value={input.description}
							rows='4'
							cols='50'
							name='description'></textarea>
						{error.description && (
							<p className={styles.error}>{error.description}</p>
						)}
					</div>
					<div className={styles.submit}>
						<button type='submit'>Add Product</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddNewProduct;
