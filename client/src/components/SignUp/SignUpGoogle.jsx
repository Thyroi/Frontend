import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createClient } from '../../actions';
import style from './SignUp.module.css';

export default function SignUpGoogle(params) {
	const info = useSelector((state) => state.google);
	const dispatch = useDispatch();

	const [error, setError] = useState({});

	const [direc, setDirec] = useState({
		calle: '',
		numero: '',
		city: '',
		zip_code: '',
	});

	const [inputs, setInputs] = useState({
		name: info.name,
		lastname: info.lastname,
		email: info.email,
		phone: '',
		login_name: '',
		login_password: '',
		address: {},
	});

	useEffect(() => {
		setError(validator(inputs, direc));
	}, [inputs, direc]);

	function handleChange(e) {
		e.preventDefault();
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
			address: { ...direc },
		});

		setError({
			...inputs,
			...direc,
			[e.target.name]: e.target.value,
		});
	}

	function handleChangeAddress(e) {
		e.preventDefault();
		setDirec({
			...direc,
			[e.target.name]: e.target.value,
		});

		setError({
			...inputs,
			...direc,
			[e.target.name]: e.target.value,
		});
	}

	function validator(inputs, direc) {
		let error = {};
		if (!inputs.phone) {
			error.phone = 'Phone is required';
		} else if (!inputs.login_name) {
			error.login_name = 'Login name is required';
		} else if (!inputs.login_password) {
			error.login_password = 'Password is required';
		} else if (!direc.calle) {
			error.calle = 'Street is required';
		} else if (!direc.numero) {
			error.numero = 'Street number is required';
		} else if (!direc.city) {
			error.city = 'City is required';
		} else if (typeof direc.city !== 'string') {
			error.city =
				'Insert a valid city (without special caracters or numbers)';
		} else if (!direc.zip_code) {
			error.zip_code = 'Zip code is required';
		}
		return error;
	}

	const disable = useMemo(() => {
		if (
			error.phone ||
			error.login_name ||
			error.login_password ||
			error.calle ||
			error.numero ||
			error.city ||
			error.zip_code
		) {
			return true;
		}
		return false;
	}, [error]);

	function handleSubmit(e) {
		e.preventDefault();
		setInputs({
			...inputs,
			address: { direc },
			phone: parseInt(inputs.phone),
		});
		dispatch(createClient(inputs));
		setInputs({
			name: info.name,
			lastname: info.lastname,
			email: info.email,
			phone: '',
			login_name: '',
			login_password: '',
			address: {},
		});
		setDirec({
			calle: '',
			numero: '',
			city: '',
			zip_code: '',
		});
		params.history.push('/Products');
	}

	return (
		<div className={style.container}>
			<form
				className={style.form}
				onSubmit={(e) => {
					handleSubmit(e);
				}}>
				<div className={style.addressGlobal}>
					<label>Address</label>
					<div className={style.address}>
						<input
							type='text'
							placeholder='Street'
							name='calle'
							value={direc.calle}
							onChange={(e) => {
								handleChangeAddress(e);
							}}
						/>
						{error.calle && <p>{error.calle}</p>}

						<input
							type='text'
							placeholder='Number'
							name='numero'
							value={direc.numero}
							onChange={(e) => {
								handleChangeAddress(e);
							}}
						/>
						{error.numero && <p>{error.numero}</p>}

						<input
							type='text'
							placeholder='City'
							name='city'
							value={direc.city}
							onChange={(e) => {
								handleChangeAddress(e);
							}}
						/>
						{error.city && <p>{error.city}</p>}

						<input
							type='text'
							placeholder='Zip Code'
							name='zip_code'
							value={direc.zip_code}
							onChange={(e) => {
								handleChangeAddress(e);
							}}
						/>
						{error.zip_code && <p>{error.zip_code}</p>}
					</div>
				</div>

				<div className={style.infoGlobal}>
					<label>Personal Information</label>
					<div className={style.infoContainer}>
						<input
							type='number'
							placeholder='Phone'
							name='phone'
							value={inputs.phone}
							onChange={(e) => {
								handleChange(e);
							}}
						/>
						{error.phone && <p>{error.phone}</p>}
					</div>
				</div>

				<div className={style.logInGlobal}>
					<label>Username</label>
					<input
						type='text'
						placeholder='Type username'
						name='login_name'
						value={inputs.login_name}
						onChange={(e) => {
							handleChange(e);
						}}
					/>
					{error.login_name && <p>{error.login_name}</p>}
					<label>Password</label>
					<input
						type='password'
						placeholder='Type password'
						name='login_password'
						value={inputs.login_password}
						onChange={(e) => {
							handleChange(e);
						}}
					/>
					{error.login_password && <p>{error.login_password}</p>}
				</div>

				<div className={style.submit}>
					<button disabled={disable} type='submit'>
						Create profile
					</button>
				</div>
			</form>
		</div>
	);
}
