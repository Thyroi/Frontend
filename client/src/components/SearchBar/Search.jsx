import React, { useState } from 'react';
import styles from './Search.module.scss';
import {useDispatch} from 'react-redux'
import { getByName } from '../../actions'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
	
	const [search, setSearch] = useState("")

	const dispatch = useDispatch()

	function handleClick(e) {
		e.preventDefault()
		dispatch(getByName(search))
		setSearch("")
	}

	function handleChange(e) {
		e.preventDefault()
		setSearch(e.target.value)
	}


	return (
		<div className={styles.container}>
      <FontAwesomeIcon className={styles.iconSearch} icon={faMagnifyingGlass}/>
			<input
      className={styles.searchInput}
				type='text'
				value={search}
				onChange={(e) => handleChange(e)}
				placeholder='Search by Id or by Type'
			/>
			<button className={styles.searchButton} onClick={(e) => {handleClick(e)}}>Search</button>
		</div>
	);
}

export default Search;
