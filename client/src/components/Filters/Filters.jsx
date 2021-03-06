import React, { useState } from 'react';
import styles from './Filters.module.css';
import { filterReducer } from '../../context';
import data from '../../Assets/Products.json';

const Dropdown = ({ label, value, options, onChange }) => {
	return (
		<label className={styles.dropdownBox}>
				<select value={value} onChange={onChange}>
					<option selected={true}>{label}</option>
					{options.map((option) => (
						<option value={option.value}>{option.label}</option>
					))}
					<option selected={true}>{label}</option>
				</select>
		</label>
	);
};

function Filters() {
	/*
	const [stock, setStock] = useState('stock');
	const [typesC, setTypesC] = useState('types');
	const [brand, setBrand] = useState('brand');
	const [collection, setCollection] = useState('collection');
	*/ const [isOffer, setIsOffer] = useState(false); /*

	const handleStockChange = (event) => {
		setStock(event.target.value);
	};

	const handleTypesChange = (event) => {
		setTypesC(event.target.value);
	};

	const handleBrandChange = (event) => {
		setBrand(event.target.value);
	};
	const handleCollectiondChange = (event) => {
		setCollection(event.target.value);
	}; */

	const [state, dispatch] = React.useReducer(filterReducer, data);
	

	const handleOfferChange = (e) => {
		e.preventDefault();
		setIsOffer(!isOffer);
		console.log(isOffer);
		dispatch({ type: 'filterOffer', payload: isOffer });
	};

	return (
		<div className={styles.dropDownContainer}>
			{/* <Dropdown
				label='Stock'
				options={[
					{ label: 'Menos de 100', value: 'LowerH' },
					{ label: 'Más de 100', value: 'HigherH' },
					{ label: 'None', value: 'Out' },
				]}
				value={stock}
				onChange={handleStockChange}
			/>

			<Dropdown
				label='Clothes Type'
				options={[
					{ label: 'Pantalones', value: 'Pantalones' },
					{ label: 'Remeras', value: 'Remeras' },
					{ label: 'Vestidos', value: 'Vestidos' },
				]}
				value={typesC}
				onChange={handleTypesChange}
			/>

			<Dropdown
				label='Brand'
				options={[
					{ label: 'Forever21', value: 'Forever21' },
					{ label: 'H&M', value: 'H&M' },
					{ label: 'Zara', value: 'Zara' },
				]}
				value={brand}
				onChange={handleBrandChange}
			/>

			<Dropdown
				label='Collection'
				options={[
					{ label: 'Winter', value: 'Winter' },
					{ label: 'Summer', value: 'Summer' },
					{ label: 'Spring', value: 'Spring' },
				]}
				value={collection}
				onChange={handleCollectiondChange}
			/> <Dropdown
				label='Offer'
				options={[
					{ label: 'None', value: false },
					{ label: 'Is Offer', value: true },
				]}
				value={'pito'}
				onChange={handleOfferChange}
			/>*/}

			<button onClick={(e) => handleOfferChange(e)}>Holis</button>

			{/* 
      //chequeaba que me trajera los valores
      
      <p> Your products with stock - {stock}</p>
      <p>Your products with type -  {typesC}</p>
      <p>Your products with brand -  {brand}</p>
      <p>Your products with collection -  {collection}</p>
      <p>Your products with Offer -  {isOffer}</p> */}
		</div>
	);
}

export default Filters;
