import React, { useState, useEffect } from 'react';
import style from './Products.module.css';
import data from '../../Assets/Products.json';
import Card from '../Card/Card';
import { filterReducer } from '../../context';

//options=[{id:"id", name:"name"},{id:"id", name:"name"},{id:"id", name:"name"},...]

const Dropdown = ({ placeHolder, options, handler }) => {
	return (
		<div className={style.dropdown}>
			<button
				className={style.dropdown_button}
				onClick={(e) => {
					e.preventDefault();
				}}>
				{placeHolder}
			</button>
			<div className={style.dropdown_content}>
				{options.map(({ id, name }) => {
					return (
						<button key={id} value={name} onClick={handler}>
							{name}
						</button>
					);
				})}
			</div>
		</div>
	);
};

function Products() {
	const [state, dispatch] = React.useReducer(filterReducer, data);

	//---------------------------------------------PAGINADO--------------------------------//

	const [results] = useState(9);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setCurrentPage(1);
	}, [state]);

	function handlePaginate(n) {
		setCurrentPage(n);
	}

	const indexOfLastPost = currentPage * results;
	const indexOfFirstPost = indexOfLastPost - results;
	const currentPosts = state?.slice(indexOfFirstPost, indexOfLastPost);

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(state?.length / results); i++) {
		pageNumbers?.push(i);
	}

	//---------------------------------------------PAGINADO--------------------------------//

	//-----------------------------------ESTADOS DE FILTERS--------------------------------//

	const [isOffer, setIsOffer] = useState();
	const [stock, setStock] = useState('stock');
	const [typesC, setTypesC] = useState('types');
	const [brand, setBrand] = useState('brand');
	const [collection, setCollection] = useState('collection');

	//-----------------------------------HANDLERS------------------------------------------//

	const handleOfferChange = (e) => {
		e.preventDefault();
		setIsOffer(() => {
			return e.target.value;
		});
		dispatch({ type: 'filterOffer', payload: isOffer });
	};

	const handleStockChange = (event) => {
		setStock(event.target.value);
	};

	const handleTypeChange = (event) => {
		setTypesC(event.target.value);
	};

	const handleBrandChange = (event) => {
		setBrand(event.target.value);
	};
	const handleCollectiondChange = (event) => {
		setCollection(event.target.value);
	};

	//-----------------------------------HANDLERS------------------------------------------//

	return (
		<div className={style.container}>
			<div className={style.filters}>
				<Dropdown
					placeHolder={'Sale'}
					options={[
						{ id: 0, name: 'Sale' },
						{ id: 1, name: 'Not sale' },
						{ id: 2, name: 'All' },
					]}
					handler={handleOfferChange}
				/>
				<Dropdown
					placeHolder={'Stock'}
					options={[
						{ id: 0, name: 'More than 100' },
						{ id: 1, name: 'Less than 100' },
						{ id: 2, name: 'No stock' },
						{ id: 3, name: 'All' },
					]}
					handler={handleStockChange}
				/>
				<Dropdown
					placeHolder={'Type'}
					options={[
						{ id: 0, name: 'T-shirts' },
						{ id: 1, name: 'Pants' },
						{ id: 2, name: 'Sweaters' },
						{ id: 3, name: 'All' },
					]}
					handler={handleTypeChange}
				/>
				<Dropdown
					placeHolder={'Brand'}
					options={[
						{ id: 0, name: 'Forever21' },
						{ id: 1, name: 'H&M' },
						{ id: 2, name: 'Zara' },
						{ id: 3, name: 'All' },
					]}
					handler={handleBrandChange}
				/>
				<Dropdown
					placeHolder={'Collection'}
					options={[
						{ id: 0, name: 'Winter' },
						{ id: 1, name: 'Spring' },
						{ id: 2, name: 'Summer' },
						{ id: 3, name: 'Fall' },
						{ id: 4, name: 'All' },
					]}
					handler={handleCollectiondChange}
				/>
			</div>
			<div className={style.cards}>
				{currentPosts.map((d) => {
					return (
						<div key={d.id_product}>
							<Card data={d} />
						</div>
					);
				})}
			</div>

			<div className={style.pagination}>
				<span>
					Showing {results < state.length ? results : state.length} of{' '}
					{state.length}
				</span>
				{pageNumbers.map((number) => {
					return (
						<span key={number}>
							<button onClick={() => handlePaginate(number)}>
								{number}
							</button>
						</span>
					);
				})}
			</div>
		</div>
	);
}

export default Products;
