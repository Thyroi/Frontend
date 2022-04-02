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
			error.description = 'This field is mandatory';
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
			<form className={styles.form}>
				<div className={styles.fields}>
					<div className={styles.brand}>
						<label>Brand</label>
						<input
							type='text'
							value={input.brand}
							name='brand'
							placeholder={error.brand}
							autoComplete='off'
							className={styles.inputStyle}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className={styles.type}>
						<label>Type</label>
						<input
							type='text'
							value={input.type}
							name='type'
							placeholder={error.type}
							autoComplete='off'
							className={styles.inputStyle}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className={styles.gender}>
						<label>Gender</label>
						<select>
							<option value='all'>Add gender</option>
							<option value='Female'>Female</option>
							<option value='Man'>Man</option>
							<option value='none'>Non Gender</option>
						</select>
					</div>
					<div className={styles.size}>
						<label>Size</label>
						<select>
							<option value='all'>Add size</option>
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
							placeholder={error.collection}
							autoComplete='off'
							className={styles.inputStyle}
							onChange={(e) => handleChange(e)}></input>
					</div>
					<div className={styles.color}>
						<label>Color</label>
						<select>
							<option value='all'>Add color</option>
							<option value='white'>white</option>
							<option value='black'>black</option>
							<option value='Pink'>Pink</option>
							<option value='Red'>Red</option>
							<option value='Blue'>Blue</option>
						</select>
					</div>
					<div className={styles.stock}>
						<label>Stock</label>
						<input
							type='number'
							value={input.stock}
							name='stock'
							placeholder={error.stock}
							autoComplete='off'
							className={styles.inputStyle}
							onChange={(e) => handleChange(e)}></input>
					</div>
					<div className={styles.price}>
						<label>Price</label>
						<input
							type='number'
							value={input.price}
							name='price'
							placeholder={error.price}
							autoComplete='off'
							onChange={(e) => handleChange(e)}
							className={styles.inputStyle}></input>
					</div>
					<div className={styles.offer}>
						<label>On sale</label>
						<input type='checkbox'></input>
					</div>
				</div>
				<div className={styles.images}>
					<div className={styles.imgCont}>
						<img src={input.img} alt='img' />
					</div>
					<div className={styles.buttonCont}>
						<button>Add image</button>
					</div>
				</div>
				<div className={styles.textDescription}>
					<label>Description</label>
					<input
						type='text'
						value={input.description}
						name='description'
						placeholder={error.description}
						autoComplete='off'
						onChange={(e) => handleChange(e)}
						className={styles.inputStyle}
					/>
				</div>
				<div className={styles.submit}>
					<button type='submit'>Add Product</button>
				</div>
			</form>
		</div>
	);
}

export default AddNewProduct;
