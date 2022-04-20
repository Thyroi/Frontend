import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Notifications } from '../../utils/utils';
import { createClient } from '../../actions';
import style from './SignUp.module.css';
import swal from 'sweetalert';
import Loader from '../Loader/Loader';

export default function SignUp(params) {
	const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

	const [error, setError] = useState({});
	const [show, setShow] = useState({
		name: false,
		lastname: false,
		email: false,
		phone: false,
		login_name: false,
		login_password: false,
		address: {
			streetNumber: false,
			provinceDepartment: false,
			city: false,
			zipCode: false,
		},
	});

	const [inputs, setInputs] = useState({
		name: '',
		lastname: '',
		email: '',
		phone: '',
		login_name: '',
		login_password: '',
		address: {
			streetNumber: '',
			provinceDepartment: '',
			city: '',
			zipCode: '',
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
	function handleBlur(e) {
		e.preventDefault();
		setShow((prevState) => {
			const newState = {
				...prevState,
				[e.target.name]: true,
			};
			return newState;
		});
	}
	function handleBlurAddress(e) {
		e.preventDefault();
		setShow((prevState) => {
			const newState = {
				...prevState,
				address: { ...prevState.address, [e.target.name]: true },
			};
			return newState;
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
		}
		if (!inputs.lastname) {
			error.lastname = 'Lastname is required';
		} else if (typeof inputs.lastname !== 'string') {
			error.lastname =
				'Insert a valid lastname (without special caracters or numbers)';
		}
		if (!inputs.email) {
			error.email = 'Email is required';
		} else if (
			/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(
				inputs.email
			) === false
		) {
			error.email = 'Email should be a valid email';
		}
		if (!inputs.phone) {
			error.phone = 'Phone is required';
		}
		if (!inputs.login_name) {
			error.login_name = 'Login name is required';
		}
		if (!inputs.login_password) {
			error.login_password = 'Password is required';
		}
		if (!inputs.address.streetNumber) {
			error.calle = 'Street and number are required';
		}
		if (!inputs.address.provinceDepartment) {
			error.provinceDepartment = 'Province is required';
		}
		if (!inputs.address.city) {
			error.city = 'City is required';
		} else if (typeof inputs.address.city !== 'string') {
			error.city =
				'Insert a valid city (without special caracters or numbers)';
		}
		if (!inputs.address.zipCode) {
			error.zipCode = 'Zip code is required';}
		else if(inputs.address.zipCode.toString().length!==4){
			error.zipCode = 'Zip code must be a 4 digits number'

		}		
		 /* if (!inputs.address.particularDetails) {
			error.zipCode = 'a particular detail is required';
		} */
		return error;
	}
	//let show=false;

	const disable = useMemo(() => {
		if (
			error.name ||
			error.lastname ||
			error.phone ||
			error.email ||
			error.login_name ||
			error.login_password ||
			error.streetNumber ||
			error.city ||
			error.zipCode ||
			error.provinceDepartment ||
			error.particularDetails
		) {
			return true;
		}
		return false;
	}, [error]);

	function handleSubmit(e) {
		e.preventDefault();
    setLoad(true);
		setInputs({
			...inputs,
			phone: parseInt(inputs.phone),
			isRegistered: true,
		});

		dispatch(createClient(inputs, setLoad));
		swal("Welcome","You're registered!", "success");
		setInputs({
			name: '',
			lastname: '',
			email: '',
			phone: '',
			login_name: '',
			login_password: '',
			address: {
				streetNumber: '',
				city: '',
				zipCode: '',
				provinceDepartment: '',
				particularDetails: '',
			},
		});
		setTimeout(() => {
			params.history.push('/login');
		}, 3500);
	}

  if(load === true){
    return <Loader/>  
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
							name='streetNumber'
							value={inputs.address.streetNumber}
							onChange={(e) => {
								handleAdress(e);
							}}
							onBlur={(e) => {
								handleBlurAddress(e);
							}}
						/>
						{error.calle && show.address.streetNumber && (
							<p className={style.error}>{error.calle}</p>
						)}

						<input
							type='text'
							placeholder='City'
							name='city'
							value={inputs.address.city}
							onChange={(e) => {
								handleAdress(e);
							}}
							onBlur={(e) => {
								handleBlurAddress(e);
							}}
						/>
						{error.city && show.address.city && (
							<p className={style.error}>{error.city}</p>
						)}

						<input
							type='text'
							placeholder='Zip Code'
							name='zipCode'
							value={inputs.address.zipCode}
							onChange={(e) => {
								handleAdress(e);
							}}
							onBlur={(e) => {
								handleBlurAddress(e);
							}}
						/>
						{error.zipCode && show.address.zipCode && (
							<p className={style.error}>{error.zipCode}</p>
						)}

						<input
							type='text'
							placeholder='province'
							name='provinceDepartment'
							value={inputs.address.provinceDepartment}
							onChange={(e) => {
								handleAdress(e);
							}}
							onBlur={(e) => {
								handleBlurAddress(e);
							}}
						/>
						{error.provinceDepartment &&
							show.address.provinceDepartment && (
								<p className={style.error}>
									{error.provinceDepartment}
								</p>
							)}

						<input
							type='text'
							placeholder='Particular details'
							name='particularDetails'
							value={inputs.address.particularDetails}
							onChange={(e) => {
								handleAdress(e);
							}}
							onBlur={(e) => {
								handleBlurAddress(e);
							}}
						/>
						{error.particularDetails &&
							show.address.particularDetails && (
								<p className={style.error}>
									{error.particularDetails}
								</p>
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
							onBlur={(e) => {
								handleBlur(e);
							}}
						/>
						{error.name && show.name && (
							<p className={style.error}>{error.name}</p>
						)}

						<input
							type='text'
							placeholder='Last name'
							name='lastname'
							value={inputs.lastname}
							onChange={(e) => {
								handleChange(e);
							}}
							onBlur={(e) => {
								handleBlur(e);
							}}
						/>
						{error.lastname && show.lastname && (
							<p className={style.error}>{error.lastname}</p>
						)}

						<input
							type='text'
							placeholder='e-mail'
							name='email'
							value={inputs.email}
							onChange={(e) => {
								handleChange(e);
							}}
							onBlur={(e) => {
								handleBlur(e);
							}}
						/>
						{error.email && show.email && (
							<p className={style.error}>{error.email}</p>
						)}

						<input
							type='number'
							placeholder='Phone number'
							name='phone'
							value={inputs.phone}
							onChange={(e) => {
								handleChange(e);
							}}
							onBlur={(e) => {
								handleBlur(e);
							}}
						/>
						{error.phone && show.phone && (
							<p className={style.error}>{error.phone}</p>
						)}
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
						onBlur={(e) => {
							handleBlur(e);
						}}
					/>
					{error.login_name && show.login_name && (
						<p className={style.error}>{error.login_name}</p>
					)}
					<label>Password</label>
					<input
						type='password'
						placeholder='Type password'
						name='login_password'
						value={inputs.login_password}
						onChange={(e) => {
							handleChange(e);
						}}
						onBlur={(e) => {
							handleBlur(e);
						}}
					/>
					{error.login_password && show.login_password && (
						<p className={style.error}>{error.login_password}</p>
					)}
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
