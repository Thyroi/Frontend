import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from './Products.module.css';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import Dropdown from '../Dropdown/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import {
	getByCatId,
	getByColId,
	getInfo,
	getOffers,
	getSelectorsCat,
	getSelectorsCol,
	clearDetail,
	setActualPage,
	nested,
	orderByPrice,
	orderByArrive,
	cleanProducts,

	orderByStars

} from '../../actions';
// import state from 'sweetalert/typings/modules/state';

export default function Products({ filtrado, filtradoOnChange }) {
	function useQuery() {
		const { search } = useLocation();
		return React.useMemo(() => new URLSearchParams(search), [search]);
	}

	// const [nested, setNested] = useState({
	//   offer: null,
	//   category: null,
	//   collection: null
	// });

	const collection = useQuery().get('collection');
	const collectionName = useQuery().get('name');

	const nestedF = useSelector((state) => state.nested);
	console.log(nestedF);

	const dispatch = useDispatch();
	var products = useSelector((state) => state.products);
	const categories = useSelector((state) => state.categories);
	const collections = useSelector((state) => state.collections);

	// useEffect(() => {
	// 	dispatch(clearDetail());
	// 	!products.length &&
	// 		setTimeout(() => {
	// 			collection
	// 				? dispatch(getByColId(collection))
	// 				: dispatch(getInfo());
	// 			dispatch(getSelectorsCat());
	// 			dispatch(getSelectorsCol());
	// 		}, 2000);
	// }, [dispatch]);

	useEffect(() => {
		dispatch(clearDetail());
		if (!products.length) {
			collection
				? dispatch(getByColId(collection)) &&
				  filtradoOnChange(collectionName)
				: dispatch(getInfo(nestedF));
		}
		// dispatch(getByCatId());
		dispatch(getSelectorsCat());
		dispatch(getSelectorsCol());
	}, []);

	//---------------------------------------------PAGINADO--------------------------------//

	const actualPage = useSelector((state) => state.actualPage);
	const [results] = useState(12);
	const [currentPage, setCurrentPage] = useState(actualPage);
	const [i, setI] = useState(0);
	const [j, setJ] = useState(i + 3);

	useEffect(() => {
		setCurrentPage(actualPage);
	}, [products]);

	useEffect(() => {
		document.querySelector('.container').scrollBy({
			top: -2000,
			left: 0,
			behavior: 'smooth',
		});
		dispatch(setActualPage(currentPage));
	}, [currentPage]);

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

	const handleOfferChange = async (e) => {
		e.preventDefault();
		var res = '';
		if (e.target.value === '0') {
			res = true;
			// await setNested({...nested, offer : res});
			nestedF.offer = res;
			dispatch(getInfo({ ...nestedF }));
			dispatch(nested(nestedF));
		} else if (e.target.value === '1') {
			res = false;
			// await setNested({...nested, offer : res});
			// await dispatch(getInfo({...nested, offer : res}));
			nestedF.offer = res;
			dispatch(getInfo({ ...nestedF }));
			dispatch(nested(nestedF));
		} else {
			nestedF.offer = null;
			dispatch(nested(nestedF));
			return dispatch(getInfo({ ...nestedF })) && filtradoOnChange('All');
		}
		filtradoOnChange(res === 'true' ? 'onOffer' : 'noOffer');
		// dispatch(getOffers(res));
	};

	/* const handleStockChange = (event) => {
		setStock(event.target.value);
	};
 */
	const handleTypeChange = (event) => {
		event.preventDefault();
		setCurrentPage(1);
		if (event.target.value === '0') {
			nestedF.category = null;
			dispatch(nested(nestedF));
			return dispatch(getInfo({ ...nestedF })) && filtradoOnChange('All');
		} else {
			filtradoOnChange(event.target.textContent);

			// setNested({...nested, category : event.target.value});
			// dispatch(getInfo({...nested, category : event.target.value}));
			// dispatch(getByCatId(event.target.value));

			nestedF.category = event.target.value;
			dispatch(getInfo({ ...nestedF }));
			dispatch(nested(nestedF));
		}
	};

	/* const handleBrandChange = (event) => {
		setBrand(event.target.value);
	}; */

	const handleCollectionChange = (event) => {
		event.preventDefault();
		setCurrentPage(1);

		if (event.target.value === '0') {
			nestedF.collection = null;
			dispatch(nested(nestedF));
			dispatch(getInfo({ ...nestedF }));
			filtradoOnChange('All');
			return;
		}

		nestedF.collection = event.target.value;
		dispatch(nested(nestedF));
		dispatch(getInfo({ ...nestedF }));
		// dispatch(getByColId(event.target.value));
		// filtradoOnChange(event.target.textContent);
	};


	const handlePriceFilter = (event) => {
		event.preventDefault();
		event.target.value === '1'
			? dispatch(orderByPrice('ASC'))
			: dispatch(orderByPrice('DESC'));
	};

	const handleArrive = (event) => {
		event.preventDefault();
		event.target.value === '1'
			? dispatch(orderByArrive('DESC'))
			: dispatch(orderByArrive('ASC'));
	};

	const handlerOrder = (event) => {
		event.preventDefault();
		if(event.target.value === "1"){
			return dispatch(orderByPrice("ASC"))
		} else if (event.target.value === "2"){
			return dispatch(orderByPrice("DESC"))
		} else if (event.target.value === "3"){
			return dispatch(orderByStars("DESC"))
		} else if (event.target.value === "4"){
			return dispatch(orderByArrive("DESC"))
		}
	}



	//-----------------------------------HANDLERS------------------------------------------//

	return !products.length ||
		!categories.women?.length ||
		!collections.length ? (
		<Loader />
	) : (
		<div className={style.container}>
			<div className={style.filters}>
				<Dropdown
					placeHolder={'Order'}
					options={[
						{ id: 1, name: 'Price ascendent' },
						{ id: 2, name: 'Price descendent' },
						{ id: 3, name: 'Best rated' },
						{ id: 4, name: 'Latest arrivals' },
					]}
					handler={handlerOrder}
				/>
				<Dropdown
					placeHolder={'Sale'}
					options={[
						{ id: 2, name: 'All' },
						{ id: 0, name: 'Sale' },
						{ id: 1, name: 'Not sale' },
					]}
					handler={handleOfferChange}
				/>
				<Dropdown
					placeHolder={'Price'}
					options={[
						{ id: 1, name: 'ASC' },
						{ id: 2, name: 'DESC' },
					]}
					handler={handlePriceFilter}
				/>
				<Dropdown
					placeHolder={'Arrival'}
					options={[
						{ id: 1, name: 'Latest arrivals' },
						{ id: 2, name: 'Earliest arrivals' },
					]}
					handler={handleArrive}
				/>

				<Dropdown
					placeHolder={'Type'}
					options={[
						{ id: 0, name: 'All' },
						...categories?.women?.filter((c) => {
							return c?.id > 2;
						}),
						...categories?.men?.filter((c) => {
							return c?.id > 2;
						}),
					]}
					handler={handleTypeChange}
				/>

				<Dropdown
					placeHolder={'Collection'}
					options={[{ id: 0, name: 'All' }, ...collections]}
					handler={handleCollectionChange}
				/>
			</div>
			<div className={style.cards}>
				{currentPosts.map((d) => {
					return <Card key={d.id_product} data={d} />;
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
						<FontAwesomeIcon icon={faCaretLeft} />
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
						<FontAwesomeIcon icon={faCaretRight} />
					</button>
				</div>
			</div>
		</div>
	);
}
