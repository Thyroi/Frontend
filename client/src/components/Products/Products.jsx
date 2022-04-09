import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from './Products.module.css';
import Card from '../Card/Card';
import Dropdown from '../Dropdown/Dropdown';

import { useDispatch, useSelector } from 'react-redux';
import {
	getByCatId,
	getByColId,
	getInfo,
	getOffers,
	getSelectorsCat,
  superduppertrupperBack
	getSelectorsCol,
	cleanProducts

} from '../../actions';

export default function Products() {
	function useQuery() {
		const { search } = useLocation();
		return React.useMemo(() => new URLSearchParams(search), [search]);
	  }
	const collection = useQuery().get('collection');
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products);
	const categories = useSelector((state) => state.categories);
	const collections = useSelector((state) => state.collections);

	useEffect(() => {
		dispatch(cleanProducts());
		collection?dispatch(getByColId((collection))):dispatch(getInfo());
		dispatch(getSelectorsCat());
		// dispatch(getSelectorsCol());
	}, [dispatch]);

	/* const products = data */

	//---------------------------------------------PAGINADO--------------------------------//

	const [results] = useState(9);
	const [currentPage, setCurrentPage] = useState(1);
	const [i, setI] = useState(0);
	const [j, setJ] = useState(i + 3);

	useEffect(() => {
		setCurrentPage(1);
	}, [products]);

	useEffect(() => {
		document.querySelector('.container').scrollTop = 0;
	}, [currentPage]);

	//probar Element.scrollIntoView();

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
	const currentPosts = products?.slice(indexOfFirstPost, indexOfLastPost);

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(products?.length / results); i++) {
		pageNumbers?.push(i);
	}

	//---------------------------------------------PAGINADO--------------------------------//

	//-----------------------------------ESTADOS DE FILTERS--------------------------------//

	//const [stock, setStock] = useState('stock');
	//const [typesC, setTypesC] = useState('types');
	//const [brand, setBrand] = useState('brand');
	//const [collection, setCollection] = useState('collection');

	//-----------------------------------HANDLERS------------------------------------------//

	const handleOfferChange = (e) => {
		e.preventDefault();
		var res = '';
		if (e.target.value === '0') {
			res = 'true';
		} else if (e.target.value === '1') {
			res = 'false';
		} else {
			return dispatch(getInfo());
		}
		dispatch(getOffers(res));
	};

	/* const handleStockChange = (event) => {
		setStock(event.target.value);
	};
 */
	const handleTypeChange = (event) => {
		event.preventDefault();
		if (event.target.value === '0') {
			return dispatch(getInfo());
		} else {
			dispatch(getByCatId(event.target.value));
		}
	};

	/* const handleBrandChange = (event) => {
		setBrand(event.target.value);
	}; */

	const handleCollectionChange = (event) => {
		event.preventDefault();
		event.target.value === '0'
			? dispatch(getInfo())
			: dispatch(getByColId(event.target.value));
	};

	//-----------------------------------HANDLERS------------------------------------------//

	return !products.length ? (
		<h2>Loading...</h2>
	) : (
		<div className={style.container}>
			<div className={style.filters}>
				{/* options=[{id:"id", name:"name"},{id:"id", name:"name"},{id:"id", name:"name"},...] */}

				<Dropdown
					placeHolder={'Sale'}
					options={[
						{ id: 2, name: 'All' },
						{ id: 0, name: 'Sale' },
						{ id: 1, name: 'Not sale' },
					]}
					handler={handleOfferChange}
				/>
				{/* <Dropdown
					placeHolder={'Stock'}
					options={[
						{ id: 0, name: 'More than 100' },
						{ id: 1, name: 'Less than 100' },
						{ id: 2, name: 'No stock' },
						{ id: 3, name: 'All' },
					]}
					handler={handleStockChange}
				/> */}
				<Dropdown
					placeHolder={'Type'}
					options={[
						{ id: 0, name: 'All' },
						...categories?.women?.filter((c) => {
							return c.id > 2;
						}),
						...categories?.men?.filter((c) => {
							return c.id > 2;
						}),
					]}
					handler={handleTypeChange}
				/>
				{/* <Dropdown
					placeHolder={'Brand'}
					options={[
						{ id: 0, name: 'Forever21' },
						{ id: 1, name: 'H&M' },
						{ id: 2, name: 'Zara' },
						{ id: 3, name: 'All' },
					]}
					handler={handleBrandChange}
				/> */}
				<Dropdown
					placeHolder={'Collection'}
					options={[{ id: 0, name: 'All' }, ...collections]}
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
						results < products.length
							? `${
									currentPage === 1
										? 1
										: results * currentPage - 1
							  } - ${results * currentPage}`
							: products.length
					} of ${products.length}`}
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
