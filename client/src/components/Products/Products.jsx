import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import style from './Products.module.css';
import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import Dropdown from '../Dropdown/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCaretLeft,
	faCaretRight,
	faArrowDownWideShort,
} from '@fortawesome/free-solid-svg-icons';

import Popup from 'reactjs-popup';

import { useDispatch, useSelector } from 'react-redux';
import {
	getByColId,
	getInfo,
	getSelectorsCat,
	getSelectorsCol,
	clearDetail,
	setActualPage,
	nested,
	clearDiscount,
} from '../../actions';

export default function Products({ filtradoOnChange }) {
	function useQuery() {
		const { search } = useLocation();
		return React.useMemo(() => new URLSearchParams(search), [search]);
	}

	const collection = useQuery().get('collection');
	const collectionName = useQuery().get('name');

	const nestedF = useSelector((state) => state.nested);

	const dispatch = useDispatch();
	var products = useSelector((state) => state.products);
	const categories = useSelector((state) => state.categories);
	const collections = useSelector((state) => state.collections);

	useEffect(() => {
		dispatch(clearDetail());
		dispatch(clearDiscount());
		if (!products?.length) {
			collection
				? dispatch(getByColId(collection)) &&
				  filtradoOnChange(collectionName)
				: dispatch(getInfo(nestedF));
		}

		dispatch(getSelectorsCat());
		dispatch(getSelectorsCol());
	}, [dispatch, collection, collectionName, nestedF, filtradoOnChange, products]);

	//---------------------------------------------PAGINADO--------------------------------//

	const actualPage = useSelector((state) => state.actualPage);
	const [results] = useState(12);
	const [currentPage, setCurrentPage] = useState(actualPage);
	const [i, setI] = useState(0);
	const [j, setJ] = useState(i + 3);

	useEffect(() => {
		setCurrentPage(actualPage);
	}, [products, actualPage]);

	useEffect(() => {
		document.querySelector('.container').scrollBy({
			top: -2000,
			left: 0,
			behavior: 'smooth',
		});
		dispatch(setActualPage(currentPage));
	}, [currentPage, dispatch]);

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

	//-----------------------------------HANDLERS------------------------------------------//

	const handleOfferChange = async (e) => {
		e.preventDefault();
		var res = '';
		setCurrentPage(1);
		if (e.target.value === '0') {
			res = true;

			nestedF.offer = res;
			dispatch(getInfo({ ...nestedF }));
			dispatch(nested(nestedF));
		} else if (e.target.value === '1') {
			res = false;

			nestedF.offer = res;
			dispatch(getInfo({ ...nestedF }));
			dispatch(nested(nestedF));
		} else {
			nestedF.offer = null;
			dispatch(nested(nestedF));
			return dispatch(getInfo({ ...nestedF })) && filtradoOnChange('All');
		}
		filtradoOnChange(res === 'true' ? 'onOffer' : 'noOffer');
	};

	const handleTypeChange = (event) => {
		event.preventDefault();
		setCurrentPage(1);
		if (event.target.value === '0') {
			nestedF.category = null;
			dispatch(nested(nestedF));
			return dispatch(getInfo({ ...nestedF })) && filtradoOnChange('All');
		} else {
			filtradoOnChange(event.target.textContent);
			nestedF.category = event.target.value;
			dispatch(getInfo({ ...nestedF }));
			dispatch(nested(nestedF));
		}
	};

	function handleReset(e) {
		e.preventDefault();
		setCurrentPage(1);
		nestedF.category = null;
		nestedF.collection = null;
		nestedF.offer = null;
		nestedF.type = null;
		nestedF.method = null;
		dispatch(getInfo({ ...nestedF })) && filtradoOnChange('All');
	}

	const handleCollectionChange = (event) => {
		event.preventDefault();
		setCurrentPage(1);

		if (event.target.value === '0') {
			nestedF.collection = null;
			dispatch(nested(nestedF));
			dispatch(getInfo({ ...nestedF })) && filtradoOnChange('All');
			return;
		}
		nestedF.collection = event.target.value;
		dispatch(nested(nestedF));
		dispatch(getInfo({ ...nestedF })) &&
			filtradoOnChange(event.target.textContent);
	};

	const handlerOrder = (event) => {
		setCurrentPage(1);
		event.preventDefault();
		if (event.target.value === '0') {
			nestedF.type = null;
			nestedF.method = null;
			dispatch(nested(nestedF)) && filtradoOnChange('All');
			return dispatch(getInfo({ ...nestedF }));
		} else if (event.target.value === '1') {
			nestedF.type = 'ASC';
			nestedF.method = 'price';
			dispatch(nested(nestedF));
			return dispatch(getInfo({ ...nestedF }));
		} else if (event.target.value === '2') {
			nestedF.type = 'DESC';
			nestedF.method = 'price';
			dispatch(nested(nestedF));
			return dispatch(getInfo({ ...nestedF }));
		} else if (event.target.value === '3') {
			nestedF.type = 'DESC';
			nestedF.method = 'rating';
			dispatch(nested(nestedF));
			return dispatch(getInfo({ ...nestedF }));
		} else if (event.target.value === '4') {
			nestedF.type = 'DESC';
			nestedF.method = 'createdAt';
			dispatch(nested(nestedF));
			return dispatch(getInfo({ ...nestedF }));
		}
	};

	//-----------------------------------HANDLERS------------------------------------------//

	return !products.length ||
		!categories.women?.length ||
		!collections.length ? (
		<Loader />
	) : (
		<div className={style.container}>
			{window.innerWidth <= 920 ? (
				<Popup
					trigger={
						<FontAwesomeIcon
							icon={faArrowDownWideShort}
							className={style.menuFilter}
						/>
					}
					nested
					position='right top'
					on='click'
					closeOnDocumentClick
					mouseLeaveDelay={300}
					mouseEnterDelay={0}
					contentStyle={{ padding: '0px', border: 'none' }}
					arrow={false}>
					{(close) => (
						<div>
							<div
								className={style.filters}
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									height: '200px',
									padding: '2rem',
								}}>
								<button
									className={style.reset}
									onClick={(e) => handleReset(e)}>
									Reset filters
								</button>
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
									options={[
										{ id: 0, name: 'All' },
										...collections,
									]}
									handler={handleCollectionChange}
								/>

								<Dropdown
									placeHolder={'Order'}
									options={[
										{ id: 0, name: 'All' },
										{ id: 1, name: 'Price ascendent' },
										{ id: 2, name: 'Price descendent' },
										{ id: 3, name: 'Best rated' },
										{ id: 4, name: 'Latest arrivals' },
									]}
									handler={handlerOrder}
								/>
							</div>
							<div
								className='button'
								onClick={() => {
									console.log('modal closed ');
									close();
								}}></div>
						</div>
					)}
				</Popup>
			) : (
				<div className={style.filters}>
					<button
						className={style.reset}
						onClick={(e) => handleReset(e)}>
						Reset filters
					</button>
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

					<Dropdown
						placeHolder={'Order'}
						options={[
							{ id: 0, name: 'All' },
							{ id: 1, name: 'Price ascendent' },
							{ id: 2, name: 'Price descendent' },
							{ id: 3, name: 'Best rated' },
							{ id: 4, name: 'Latest arrivals' },
						]}
						handler={handlerOrder}
					/>
				</div>
			)}

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
