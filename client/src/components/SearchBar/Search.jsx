import React, { useEffect, useRef, useState } from 'react';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { getByName } from '../../actions';
import { Notifications } from '../../utils/utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search({ placeholder, data }) {
	const [search, setSearch] = useState('');
	const [cursor, setCursor] = useState(-1);
	const [filteredData, setFilteredData] = useState([]);
	const keypress = { Enter: handleClick, Escape: handleClear, ArrowDown: handleCursor, ArrowUp: handleCursor };

	const resultados = useRef();
	const busqueda = useRef();
	const dispatch = useDispatch();

	function handleCursor(e) {
		e.key==='ArrowUp' && cursor>0 && setCursor(prevCursor => prevCursor - 1);
		e.key==='ArrowDown' && cursor<filteredData.length-1 && setCursor(prevCursor => prevCursor + 1);
		setCursor(state=> {
			resultados.current.children[state].focus();
			return state;
		})
	}

	function handleClear(e) {
		e.preventDefault();
		setSearch('');
		setFilteredData([]);
		busqueda.current.focus();
	}

	function handleClick(e) {
		e.preventDefault();
		resultados.current.children[cursor].click();
		return window.location.href.includes('/home')
			? (dispatch(getByName(search)), setSearch(''))
			: Notifications('Go home to search');
	}

	function handleChange(e) {
		e.preventDefault();
		const searchWord = e.target.value;
		setSearch(searchWord);
		const filtered = data.filter(value => {
			return value.name.toLowerCase().includes(searchWord.toLowerCase());
		});
		searchWord !== "" ? setFilteredData(filtered) : setFilteredData([]);
	}

	return (
		<div className={styles.container}>
			<div className={styles.searchInputs}>
				<div className={styles.searchIcon}>
					<FontAwesomeIcon className={styles.iconSearch} icon={faMagnifyingGlass} />
				</div>
				<input
					className={styles.searchInput}
					type='text'
					value={search}
					ref={busqueda}
					onChange={(e) => handleChange(e)}
					placeholder='Search by name, brand, type, color'
					onKeyDown={(e) => {
						console.log(e.key);
						keypress[e.key] && keypress[e.key](e);
					}}
				/>
				<button
					className={styles.searchButton}
					onClick={(e) => {
						handleClick(e);
					}}>
					Search
				</button>
			</div>
			{filteredData.length !== 0 && (
				<div className={styles.searchResult} ref={resultados} onKeyDown={e=>keypress[e.key] && keypress[e.key](e)}>
					{filteredData.map((value, key) => {
						return (
							<a className={styles.dataItem} key={key} 
							href={`http://localhost:3000/products/${value.id_product}`}
							>
								<p>{value.name}</p>
							</a>
						)
					})}
				</div>
			)}
		</div>
	);
}

export default Search;
