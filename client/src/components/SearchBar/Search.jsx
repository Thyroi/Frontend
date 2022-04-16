import React, { useState } from 'react';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { getByName } from '../../actions';
import { Notifications } from '../../utils/utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search({ placeholder, data }) {
	const [search, setSearch] = useState('');
	const [filteredData, setFilteredData] = useState([]);
	const keypress = { Enter: handleClick };

	const dispatch = useDispatch();

	function handleClick(e) {
		e.preventDefault();
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
					onChange={(e) => handleChange(e)}
					placeholder='Search by name, brand, type, color'
					onKeyPress={(e) => {
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
				<div className={styles.searchResult}>
					{filteredData.map((value, key) => {
						return (
							<a className={styles.dataItem} key={key} href={`http://localhost:3000/products/${value.id_product}`}>
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
