import React, { useState } from 'react';
import styles from './Search.module.css';
import {useDispatch} from 'react-redux'
import { getByName } from '../../actions'

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
			<input
				type='text'
				value={search}
				onChange={(e) => handleChange(e)}
				placeholder='Search by Id or by Type'
			/>
			<button onClick={(e) => {handleClick(e)}}>Search</button>
		</div>
	);
}

export default Search;
