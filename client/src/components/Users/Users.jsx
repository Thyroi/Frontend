import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	getAllUsers,
	deleteUser,
	updatePermission,
	addNewUser,
} from '../../actions/index';
import style from './Users.module.css';
// import swal from '@sweetalert/with-react'

function Users() {
	const dispatch = useDispatch();
	const [users, setUsers] = useState('');

	const [newUser, setnewUser] = useState({
		user_name: '',
		user_password: '',
		rol: '',
	});
	const allUser = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(getAllUsers());
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

	return (
		<div className={style.divContainerAdmin}>
			<h2>Manage users</h2>
			<div className={style.createUser}>
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
										}}>
										{' '}
										✖
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
		</div>
	);
}

export default Users;
