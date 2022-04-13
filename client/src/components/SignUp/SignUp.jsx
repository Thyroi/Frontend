import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { createClient } from '../../actions';
import style from './SignUp.module.css';

export default function SignUp(params) {
	const dispatch = useDispatch();

	const [error, setError] = useState({});

	const [inputs, setInputs] = useState({
		name: '',
		lastname: '',
		email: '',
		phone: '',
		login_name: '',
		login_password: '',
		address: {
			calleNumero: '',
			province: '',
			city: '',
			zip_code: '',
		},
	});

	useEffect(() => {
		setError(validator(inputs));
	}, [inputs]);

	function handleChange(e) {
		e.preventDefault();
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});

		setError({
			...inputs,
			[e.target.name]: e.target.value,
		});
	}

	function handleAdress(e) {
		e.preventDefault();
		setInputs({
			...inputs,
			address: { ...inputs.address, [e.target.name]: e.target.value },
		});
	}

	function validator(inputs) {
		let error = {};
		if (!inputs.name) {
			error.name = 'Name is required';
		} else if (typeof inputs.name !== 'string') {
			error.name =
				'Insert a valid name (without special caracters or numbers)';
		} else if (!inputs.lastname) {
			error.lastname = 'Lastname is required';
		} else if (typeof inputs.lastname !== 'string') {
			error.lastname =
				'Insert a valid lastname (without special caracters or numbers)';
		} else if (!inputs.email) {
			error.email = 'Email is required';
		} else if (
			/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
				inputs.email
			) === false
		) {
			error.email = 'Email should be a valid email';
		} else if (!inputs.phone) {
			error.phone = 'Phone is required';
		} else if (!inputs.login_name) {
			error.login_name = 'Login name is required';
		} else if (!inputs.login_password) {
			error.login_password = 'Password is required';
		} else if (!inputs.address.calleNumero) {
			error.calle = 'Street and number are required';
		} else if (!inputs.address.province) {
			error.province = 'Province is required';
		} else if (!inputs.address.city) {
			error.city = 'City is required';
		} else if (typeof inputs.address.city !== 'string') {
			error.city =
				'Insert a valid city (without special caracters or numbers)';
		} else if (!inputs.address.zip_code) {
			error.zip_code = 'Zip code is required';
		} else if (!inputs.address.particular_details) {
			error.zip_code = 'a particular detail is required';
		}
		return error;
	}

	const disable = useMemo(() => {
		if (
			error.name ||
			error.lastname ||
			error.phone ||
			error.email ||
			error.login_name ||
			error.login_password ||
			error.calleNumero ||
			error.city ||
			error.zip_code ||
			error.province ||
			error.particular_details
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
			isRegistered: true,
		});
		dispatch(createClient(inputs));
		alert("You're registered!");
		setInputs({
			name: '',
			lastname: '',
			email: '',
			phone: '',
			login_name: '',
			login_password: '',
			address: {
				calleNumero: '',
				city: '',
				zip_code: '',
				province: '',
				particular_details: '',
			},
		});
		params.history.push('/login');
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
							placeholder='Street and number'
							name='calleNumero'
							value={inputs.address.calleNumero}
							onChange={(e) => {
								handleAdress(e);
							}}
						/>
						{error.calleNumero && <p>{error.calleNumero}</p>}

						<input
							type='text'
							placeholder='City'
							name='city'
							value={inputs.address.city}
							onChange={(e) => {
								handleAdress(e);
							}}
						/>
						{error.city && <p>{error.city}</p>}

						<input
							type='text'
							placeholder='Zip Code'
							name='zip_code'
							value={inputs.address.zip_code}
							onChange={(e) => {
								handleAdress(e);
							}}
						/>
						{error.zip_code && <p>{error.zip_code}</p>}

						<input
							type='text'
							placeholder='Province'
							name='province'
							value={inputs.address.province}
							onChange={(e) => {
								handleAdress(e);
							}}
						/>
						{error.province && <p>{error.province}</p>}

						<input
							type='text'
							placeholder='Particular details'
							name='particular_details'
							value={inputs.address.particular_details}
							onChange={(e) => {
								handleAdress(e);
							}}
						/>
						{error.particular_details && (
							<p>{error.particular_details}</p>
						)}
					</div>
				</div>

				<div className={style.infoGlobal}>
					<label>Personal Information</label>
					<div className={style.infoContainer}>
						<input
							type='text'
							placeholder='Name'
							name='name'
							value={inputs.name}
							onChange={(e) => {
								handleChange(e);
							}}
						/>
						{error.name && <p>{error.name}</p>}

						<input
							type='text'
							placeholder='Last name'
							name='lastname'
							value={inputs.lastname}
							onChange={(e) => {
								handleChange(e);
							}}
						/>
						{error.lastname && <p>{error.lastname}</p>}

						<input
							type='text'
							placeholder='e-mail'
							name='email'
							value={inputs.email}
							onChange={(e) => {
								handleChange(e);
							}}
						/>
						{error.email && <p>{error.email}</p>}

						<input
							type='number'
							placeholder='Phone number'
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
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
}
