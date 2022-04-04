import React, { useEffect, useState } from 'react';
import styles from './AddNewProduct.module.css';
import Dropdown from '../Dropdown/Dropdown';
import ImgGallery from '../ImgGallery/ImgGallery';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../actions';

var idNumerico = 0

function AddNewProduct() {
	console.log(idNumerico)

	const [error, setError] = useState({});
	const [input, setInput] = useState({
		product: {
		id_product: idNumerico,
		name: "",
		authorized_refund: false,
		price: "",
		description: "",
		brand: "",
		is_offer: false,
		variants: {},
		sdelete: false,
		default_image: "https://static.zara.net/photos///2022/V/T/1/p/0218/305/400/2/w/613/0218305400_1_1_1.jpg?ts=1648804927147",},
		categories: ["women"], 
		collection: ""
	});

	const dispatch = useDispatch()

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
		e.preventDefault();
		setInput((input) => ({
			...input,
			[e.target.name]:
				e.target.name === 'is_offer' ? !input.is_offer : e.target.name === "collection" ? parseInt(e.target.value) : e.target.name === "price" ? parseInt(e.target.value) : e.target.value,
		}));
	};

	const array = [
		{
			"product": {
				"id_product": 1343123,
				"name": "Colorfull Socks ",
				"authorized_refund": false,
				"price": 12.99,
				"description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
				"brand": "swimwear_all",
				"is_offer": false,
				"variants": [
					{
						"ColorName": "BLACK/RED",
						"Stocks": {
							"ONE SIZE": 108
						},
						"ProductImages": [
							"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw4da9b486/1_front_750/00459086-01.jpg",
							"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw4da9b486/1_front_750/00459086-01.jpg",
							"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw334da0a7/2_side_750/00459086-01.jpg",
							"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwa54a165f/3_back_750/00459086-01.jpg",
							"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw26f980c0/4_full_750/00459086-01.jpg"
						],
						"SwatchImage": "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwb4008630/sw_22/00459086-01.jpg"
					}
				],
				"sdelete": false,
				"default_image": "https://s3-us-west-2.amazonaws.com/melingoimages/Images/88828.jpg"
			},
			"categories":["shoes"],
			"collection": 2
		},
		{
			"product": {
				"id_product": 112558,
				"name": "Camisa de fuerza",
				"authorized_refund": false,
				"price": 12.99,
				"description": "white cotton straitjacket to go outside",
				"brand": "Adidas",
				"is_offer": false,
				"variants": [
					{
						"ColorName": "BLACK/RED",
						"Stocks": {
							"ONE SIZE": 108
						},
						"ProductImages": [
							"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw4da9b486/1_front_750/00459086-01.jpg",
							"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw4da9b486/1_front_750/00459086-01.jpg",
							"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw334da0a7/2_side_750/00459086-01.jpg",
							"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwa54a165f/3_back_750/00459086-01.jpg",
							"https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dw26f980c0/4_full_750/00459086-01.jpg"
						],
						"SwatchImage": "https://www.forever21.com/on/demandware.static/-/Sites-f21-master-catalog/default/dwb4008630/sw_22/00459086-01.jpg"
					}
				],
				"sdelete": false,
				"default_image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Modelo_en_camisa_de_fuerza.jpg/800px-Modelo_en_camisa_de_fuerza.jpg"
			},
			"categories":["top_blouses"],
			"collection": 3
		}
		]

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(addProduct(array[idNumerico++]))
		console.log(input)
		idNumerico++
		setInput({
			product: {
			id_product: idNumerico,
			name: "",
			authorized_refund: false,
			price: "",
			description: "",
			brand: "",
			is_offer: false,
			variants: {},
			sdelete: false,
			default_image: "https://static.zara.net/photos///2022/V/T/1/p/0218/305/400/2/w/613/0218305400_1_1_1.jpg?ts=1648804927147",},
			categories: ["women"], 
			collection: ""
		})

	};

	
	return (
		<div className={styles.AddProductContainer}>
			<form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
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
							value={input.name}
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
							handler={(e) => handleChange(e)}
						/>
						<span>{input.gender}</span>
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
							handler={(e) => handleChange(e)}
						/>
						<span>{input.size}</span>
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
							handler={(e) => handleChange(e)}
						/>
						<span>{input.color}</span>
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

						<input
							type='button'
							name='is_offer'
							value={input.is_offer}
							onClick={(e) => handleChange(e)}></input>
					</div>
				</div>
				<div className={styles.images}>
					<div className={styles.imgCont}>
						<ImgGallery />
					</div>
					<div className={styles.buttonCont}>
						<button disabled={true}>Add image</button>
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
