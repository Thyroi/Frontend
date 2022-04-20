import React, { useEffect, useRef, useState } from 'react';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { getByName } from '../../actions';
import { Notifications } from '../../utils/utils';
import swal from '@sweetalert/with-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Search({ allData, data, filtrado }) {
	const [search, setSearch] = useState('');
	const [checked, setChecked] = useState(false);
	const [cursor, setCursor] = useState(-1);
	const [filteredData, setFilteredData] = useState([]);
	const keypress = {
		Enter: handleClick,
		Escape: handleClear,
		ArrowDown: handleCursor,
		ArrowUp: handleCursor,
	};

	const resultados = useRef();
	const busqueda = useRef();
	const dispatch = useDispatch();

	function handleCursor(e) {
		e.key === 'ArrowUp' &&
			cursor > 0 &&
			setCursor((prevCursor) => prevCursor - 1);
		e.key === 'ArrowDown' &&
			cursor < filteredData.length - 1 &&
			setCursor((prevCursor) => prevCursor + 1);
		setCursor((state) => {
			resultados.current.children[state].focus();
			state === 0 &&
				setTimeout(() => {
					resultados.current.scrollTop = 0;
				}, 200);
			return state;
		});
	}

	function handleClear(e) {
		e && e.preventDefault();
		setSearch('');
		setFilteredData([]);
		setCursor(-1);
		busqueda.current.focus();
	}

	function handleClick(e) {
		e.preventDefault();
		cursor > -1 && resultados.current.children[cursor].click();
		handleClear();
		dispatch(getByName(search, swal));
	}

	function handleChange(e) {
		e.preventDefault();
		const searchWord = e.target.value;
		setSearch(searchWord);
		const source = checked ? data : allData;
		const filtered = source.filter((value) => {
			return value.name.toLowerCase().includes(searchWord.toLowerCase());
		});
		searchWord !== '' ? setFilteredData(filtered) : setFilteredData([]);
	}

	function handleOnBlur(e) {
		if (
			!e.currentTarget.contains(e.relatedTarget) &&
			!resultados.current.contains(e.relatedTarget)
		) {
			console.log(e.relatedTarget);
			console.log(resultados.current);
			console.log(resultados.current.contains(e.relatedTarget));
			setSearch('');
			setFilteredData([]);
			setCursor(-1);
		}
	}

	return (
		<div className={styles.container}>
			<div
				className={styles.searchInputs}
				onBlur={(e) => handleOnBlur(e)}>
				<FontAwesomeIcon
					className={styles.iconSearch}
					icon={faMagnifyingGlass}
				/>

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
				{filtrado !== 'All' && (
					<div className={styles.searchIn}>
						<span htmlFor='searchIn'>{`In: ${
							filtrado.split(' ')[0]
						}...`}</span>
						<input
							className={styles.check}
							type='checkbox'
							name='searchIn'
							value={checked}
							onChange={() => setChecked(!checked)}
						/>
					</div>
				)}
				<button
					className={styles.searchButton}
					onClick={(e) => {
						handleClick(e);
					}}>
					Search
				</button>
			</div>
			{
				<div
					className={
						filteredData.length !== 0
							? styles.searchResult
							: styles.searchResultNone
					}
					ref={resultados}
					onKeyDown={(e) => keypress[e.key] && keypress[e.key](e)}
					onBlur={(e) => handleOnBlur(e)}>
					{filteredData.map((value, key) => {
						return (
							<a
								className={styles.dataItem}
								key={key}
								href={`/products/${value.id_product}`}>
								<p>{value.name}</p>
							</a>
						);
					})}
				</div>
			}
		</div>
	);
}

export default Search;
