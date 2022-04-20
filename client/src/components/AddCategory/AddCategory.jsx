import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addCategory } from '../../actions/index';
import style from './AddCategory.module.css';
// import swal from '@sweetalert/with-react'

function AddCategory() {
	const dispatch = useDispatch();

	const [newCategory, setNewCategory] = useState({
		id_category: '',
		name: '',
		parent: '',
	});

	const selectCatType = (e) => {
		e.preventDefault();
		setNewCategory({
			...newCategory,
			parent: parseInt(e.target.value),
		});
	};
	const nameNewCategory = (e) => {
		e.preventDefault();
		setNewCategory({
			...newCategory,
			name: e.target.value,
		});
	};
	const idCateg = (e) => {
		e.preventDefault();
		setNewCategory({
			...newCategory,
			id_category: parseInt(e.target.value),
		});
	};
	const addNewCategory = (e) => {
		e.preventDefault();
		dispatch(addCategory(newCategory));
		setNewCategory({
			id_category: '',
			name: '',
			parent: '',
		});
	};

	return (
		<div className={style.divContainerAdmin}>
			<div className={style.createCat}>
				<h2>Create category</h2>
				<input
					value={newCategory.name}
					onChange={nameNewCategory}
					placeholder='Add category'></input>
				<select onChange={selectCatType}>
					<option value=''>Select Type</option>
					<option value='1'>Women</option>
					<option value='2'>Men</option>
				</select>
				<input
					value={newCategory.id_category}
					onChange={idCateg}
					placeholder='Write your ID'></input>
				<button onClick={(e) => addNewCategory(e)}>
					Create category
				</button>
			</div>
		</div>
	);
}

export default AddCategory;
