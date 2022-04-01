import React, { useState } from 'react';
import styles from './Search.module.css';

function Search() {
	const [search, setSearch] = useState('');

	function handleChange(e) {
		setSearch(e.target.value);
		console.log(typeof e.target.value);
	}

	return (
		<div className={styles.container}>
			<input
				type='text'
				value={search}
				onChange={(e) => handleChange(e)}
				placeholder='Search by Id or by Type'
			/>
			<button>Search</button>
		</div>
	);
}

export default Search;
