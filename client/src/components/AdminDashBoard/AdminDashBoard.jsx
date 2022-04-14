
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	getAllUsers,
	deleteUser,
	updatePermission,
	getSelectorsCat,
	addNewUser,
	addCategory,
	getOrders,
	orderFilter,
} from '../../actions/index';
import style from './AdminDashBoard.module.css';
// import swal from '@sweetalert/with-react'
import {Link} from 'react-router-dom'
import Dropdown from "../Dropdown/Dropdown";

function AdminDashBoard() {
	const dispatch = useDispatch();
	const [users, setUsers] = useState('');
	const [newCategory, setNewCategory] = useState({
		id_category: '',
		name: '',
		parent: '',
	});
	const [newUser, setnewUser] = useState({
		user_name: '',
		user_password: '',
		rol: '',
	});
	const allUser = useSelector((state) => state.users);
	const orders = useSelector((state) => state.orders);
	
	useEffect(() => {
		dispatch(getAllUsers());
		dispatch(getSelectorsCat());
		dispatch(getOrders())
	}, [dispatch]);


	const removeFunction = (e) => {
		dispatch(
			deleteUser({
				id_user: parseInt(e.target.value),
			})
		);

		setTimeout(() => {
			dispatch(getAllUsers());
		}, 1000);
	};
	const selectUserType = (e) => {
		e.preventDefault();
		setUsers(e.target.value);
	};
	const updateUser = (e) => {
		e.preventDefault();
		if (users === '1') {
			dispatch(
				updatePermission({
					id_user: e.target.value,
					rol: 'admin',
				})
			);
		} else if (users === '2') {
			dispatch(
				updatePermission({
					id_user: e.target.value,
					rol: 'employee',
				})
			);
		} else {
			return <div>Nothing to see here</div>;
		}

		setTimeout(() => {
			dispatch(getAllUsers());
		}, 1000);
	};
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
	const settingName = (e) => {
		e.preventDefault();
		setnewUser({
			...newUser,
			user_name: e.target.value,
		});
	};
	const settingPassword = (e) => {
		e.preventDefault();
		setnewUser({
			...newUser,
			user_password: e.target.value,
		});
	};
	const selectRol = (e) => {
		e.preventDefault();
		setnewUser({
			...newUser,
			rol: e.target.value,
		});
	};
	const handleSubmitAccion = (e) => {
		e.preventDefault();
		dispatch(addNewUser(newUser));
		setnewUser({
			user_name: '',
			user_password: '',
			rol: '',
		});
		setTimeout(() => {
			dispatch(getAllUsers());
		}, 1000);
	};
	function handleFilterStatus(e) {
		e.preventDefault();
		dispatch(orderFilter(e.target.value));
	}
	function bringAllOrders (e) {
		e.preventDefault();
		dispatch(getOrders())
	}
	return (
		<div className={style.divContainerAdmin}>
			<div className={style.showUsers}>
				<hr
					style={{
						border: '1px solid lightgray',
						width: '80%',
					}}
				/>
				<label>User list</label>
				{!allUser ? (
					<div>Nothing to see here...</div>
				) : (
					allUser?.map((user) => {
						return (
							<div className={style.cardUser} key={user.id_user}>
								<div className={style.top}>
									<span>
										{'Id: '}
										{user.id_user}
									</span>
									<span>
										{'User name:  '}
										{user.user_name}
									</span>
									<span>
										{'Role:  '}
										{user.rol}
									</span>
									<select onChange={selectUserType}>
										<option value=''>Select Role</option>
										<option value='1'>Admin</option>
										<option value='2'>Employee</option>
									</select>
									<button
										value={user.id_user}
										onClick={removeFunction}
										style={{
											maxWidth: '3rem',
										}}> ✖
										
									</button>
								</div>
								<div className={style.bottom}>
									<button
										value={user.id_user}
										onClick={(e) => updateUser(e)}>
										Change User
									</button>
								</div>
							</div>
						);
					})
				)}
			</div>

			<div className={style.createUser}>
				<label>Create user</label>
				<input
					onChange={settingName}
					value={newUser.user_name}
					placeholder='Name'></input>
				<input
					type='password'
					placeholder='Password'
					onChange={settingPassword}
					value={newUser.user_password}></input>
				<select onChange={selectRol}>
					<option value=''>Select New Role</option>
					<option value='admin'>Admin</option>
					<option value='employee'>Employee</option>
				</select>
				<button onClick={handleSubmitAccion}>Create user</button>
			</div>

			<div className={style.createCat}>
				<label>Create category</label>
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
				<button onClick={addNewCategory}>Create category</button>
			</div>

			<div>
				<button onClick={bringAllOrders}>All orders</button>
			<select onChange={handleFilterStatus}>
					<option value=''>Filter By Status</option>
					<option value='Canceled'>Canceled</option>
					<option value='Submited'>Submited</option>
					<option value='Completed'>Completed</option>
					<option value='Processing'>Processing</option>
				</select> 
				{orders?.map((order) =>{
					return	<div key={order?.orderId}>
						<table className={style.tableOrder}>
							<thead>
							<tr>
								<th>Client</th>
								<th>Order status</th>
								{/* <th>Adress</th>
								<th>Phone Number</th> */}
								<th>Total </th>
								<th></th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>{order?.Client.name} {order?.Client.lastname}</td>
								<td>{order?.orderStatus}</td>
								{/*<td>`{order.address.calle} {order.address.city} ZIP {order.address.zip_code}`</td>
								<td>{order.ClientPhone}</td> */}
								<td>$ {order?.total}</td>
								<td><Link to={`/admindashboard/${order?.orderId}`}> Ver Detalle</Link>  </td>
							</tr>
						</tbody>

						</table>
					</div>
				})
			}
			</div>
		</div>
	);
}

export default AdminDashBoard;

