import React, { useState, useEffect } from 'react';
import style from './Products.module.css';
import data from '../../Assets/Products.json';
import Card from '../Card/Card';
import { filterReducer } from '../../context';
import Dropdown from '../Dropdown/Dropdown';

export default function Products() {
	const [state, dispatch] = React.useReducer(filterReducer, data);

	//---------------------------------------------PAGINADO--------------------------------//

	const [results] = useState(9);
	const [currentPage, setCurrentPage] = useState(1);
	const [i, setI] = useState(0);
	const [j, setJ] = useState(i + 3);

	useEffect(() => {
		setCurrentPage(1);
	}, [state]);

	function previousPage(e) {
		e.preventDefault();
		setCurrentPage((current) => (current -= 1));
		if (currentPage < pageNumbers.length) {
			setI((i) => (i > 1 ? i - 1 : 0));
			setJ((j) => (i > 0 ? j - 1 : j));
		}
	}

	function nextPage(e) {
		e.preventDefault();
		setCurrentPage((current) => (current += 1));
		if (currentPage > 1) {
			setJ((j) => (j < pageNumbers.length ? j + 1 : j));
			setI((i) => (j < pageNumbers.length ? i + 1 : i));
		}
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
	const handleCollectionChange = (event) => {
		setCollection(event.target.value);
	};

	//-----------------------------------HANDLERS------------------------------------------//

	return (
		<div className={style.container}>
			<div className={style.filters}>
				{/* options=[{id:"id", name:"name"},{id:"id", name:"name"},{id:"id", name:"name"},...] */}

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
					handler={handleCollectionChange}
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
				<div className={style.text}>
					{`Showing ${
						results < state.length
							? `${
									currentPage === 1
										? 1
										: results * currentPage - 1
							  } - ${results * currentPage}`
							: state.length
					} of ${state.length}`}
				</div>
				<div className={style.pages}>
					<button
						onClick={(e) => previousPage(e)}
						disabled={currentPage === 1}>
						{'<<'}
					</button>
					{pageNumbers?.slice(i, j).map((number) => {
						return (
							<span
								key={number}
								className={
									number === currentPage
										? style.activePage
										: style.inactivePage
								}>
								{number}
							</span>
						);
					})}
					<button
						disabled={currentPage === pageNumbers.length}
						onClick={(e) => nextPage(e)}>
						{'>>'}
					</button>
				</div>
			</div>
		</div>
	);
}
