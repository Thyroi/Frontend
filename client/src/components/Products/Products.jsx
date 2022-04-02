import React, { useState, useEffect } from 'react';
import style from './Products.module.css';
import Filters from '../Filters/Filters';
import data from '../../Assets/Products.json';
import Card from '../Card/Card';

function Products() {
	const [results, setResults] = useState(9);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setCurrentPage(1);
	}, []);

	function handleResults(e) {
		e.preventDefault();
		setResults(e.target.value);
	}

	function handlePaginate(n) {
		setCurrentPage(n);
	}

	const indexOfLastPost = currentPage * results;
	const indexOfFirstPost = indexOfLastPost - results;
	const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(data.length / results); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className={style.container}>
			<div className={style.filters}>
				<Filters />
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
					Showing {results} of {data.length}
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
