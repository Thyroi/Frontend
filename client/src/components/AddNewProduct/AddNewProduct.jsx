import React, { useEffect, useState } from 'react';
import styles from './AddNewProduct.module.css';
import Dropdown from '../Dropdown/Dropdown';

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
						<Dropdown
							placeHolder={'Gender'}
							options={[
								{ id: 0, name: 'Man' },
								{ id: 1, name: 'Woman' },
							]}
							handler={(e) => {
								e.preventDefault();
								alert('no function assigned');
							}}
						/>
					</div>
					<div className={styles.size}>
						<Dropdown
							placeHolder={'Size'}
							options={[
								{ id: 0, name: 'XS' },
								{ id: 1, name: 'S' },
								{ id: 2, name: 'M' },
								{ id: 3, name: 'L' },
								{ id: 4, name: 'XL' },
								{ id: 5, name: 'XXL' },
							]}
							handler={(e) => {
								e.preventDefault();
								alert('no function assigned');
							}}
						/>
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
						<Dropdown
							placeHolder={'Color'}
							options={[
								{ id: 0, name: 'Black' },
								{ id: 1, name: 'White' },
								{ id: 2, name: 'Pink' },
								{ id: 3, name: 'Red' },
								{ id: 4, name: 'Blue' },
								{ id: 5, name: 'Yellow' },
							]}
							handler={(e) => {
								e.preventDefault();
								alert('no function assigned');
							}}
						/>
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
