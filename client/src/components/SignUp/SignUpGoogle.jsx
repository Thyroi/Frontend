import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createClient } from '../../actions';
import style from './SignUp.module.css';

export default function SignUpGoogle(params) {
	const info = useSelector((state) => state.google);
	const dispatch = useDispatch();

	const [error, setError] = useState({});

	const [inputs, setInputs] = useState({
		name: info.name,
		lastname: info.lastname,
		email: info.email,
		phone: '',
		login_name: '',
		login_password: '',
		address: {
		calle: '',
		numero: '',
		city: '',
		zip_code: ''},
	});

	useEffect(() => {
		setError(validator(inputs));
	}, [inputs]);

	function handleChange(e) {
		e.preventDefault();
		setInputs({
			...inputs,
			[e.target.name]: e.target.value
		});

		setError({
			...inputs,
			[e.target.name]: e.target.value,
		});
	}

	function handleAddress(e) {
		e.preventDefault();
		setInputs({
			...inputs,
			address: {...inputs.address, [e.target.name]: e.target.value}
		});

		setError({
			...inputs,
			[e.target.name]: e.target.value,
		});
	}

	function validator(inputs) {
		let error = {};
		if (!inputs.phone) {
			error.phone = 'Phone is required';
		} else if (!inputs.login_name) {
			error.login_name = 'Login name is required';
		} else if (!inputs.login_password) {
			error.login_password = 'Password is required';
		} else if (!inputs.address.calle) {
			error.calle = 'Street is required';
		} else if (!inputs.address.numero) {
			error.numero = 'Street number is required';
		} else if (!inputs.address.city) {
			error.city = 'City is required';
		} else if (typeof inputs.address.city !== 'string') {
			error.city =
				'Insert a valid city (without special caracters or numbers)';
		} else if (!inputs.address.zip_code) {
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
			phone: parseInt(inputs.phone),
		});
		let setLoad = true;
		dispatch(createClient(inputs, setLoad));
		setInputs({
			name: info.name,
			lastname: info.lastname,
			email: info.email,
			phone: '',
			login_name: '',
			login_password: '',
			address: {
			calle: '',
			numero: '',
			city: '',
			zip_code: ''},
		});
		params.history.push('/LogIn');
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
							value={inputs.address.calle}
							onChange={(e) => {
								handleAddress(e);
							}}
						/>
						{error.calle && <p>{error.calle}</p>}

						<input
							type='text'
							placeholder='Number'
							name='numero'
							value={inputs.address.numero}
							onChange={(e) => {
								handleAddress(e);
							}}
						/>
						{error.numero && <p>{error.numero}</p>}

						<input
							type='text'
							placeholder='City'
							name='city'
							value={inputs.address.city}
							onChange={(e) => {
								handleAddress(e);
							}}
						/>
						{error.city && <p>{error.city}</p>}

						<input
							type='text'
							placeholder='Zip Code'
							name='zip_code'
							value={inputs.address.zip_code}
							onChange={(e) => {
								handleAddress(e);
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
