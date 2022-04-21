import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Notifications } from '../../utils/utils';
import { createClient } from '../../actions';
import style from './SignUp.module.css';
import swal from 'sweetalert';
import Loader from '../Loader/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSquareCheck,
	faSquareXmark,
} from '@fortawesome/free-solid-svg-icons';

export default function SignUp(params) {
	const dispatch = useDispatch();
	const [load, setLoad] = useState(false);

	const emailRegEx = useMemo(
		() => new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
		[]
	);

	const zipCodeRegEx = useMemo(() => new RegExp(/^\d{4}$/), []);

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
		setError({
			name: inputs.name ? false : true,
			lastname: inputs.lastname ? false : true,
			email: !emailRegEx.test(inputs.email),
			phone: inputs.phone ? false : true,
			login_name: inputs.login_name ? false : true,
			login_password: inputs.login_password ? false : true,
			streetNumber: inputs.address.streetNumber ? false : true,
			provinceDepartment: inputs.address.provinceDepartment
				? false
				: true,
			city: inputs.address.city ? false : true,
			zipCode: !zipCodeRegEx.test(inputs.address.zipCode),
		});

		setDisable(
			!(
				!error.name &&
				!error.lastname &&
				!error.email &&
				!error.phone &&
				!error.login_name &&
				!error.login_password &&
				!error.streetNumber &&
				!error.provinceDepartment &&
				!error.city &&
				!error.zipCode
			)
		);
	}, [inputs]);

	const [error, setError] = useState({
		name: inputs.name ? false : true,
		lastname: inputs.lastname ? false : true,
		email: !emailRegEx.test(inputs.email),
		phone: inputs.phone ? false : true,
		login_name: inputs.login_name ? false : true,
		login_password: inputs.login_password ? false : true,
		streetNumber: inputs.streetNumber ? false : true,
		provinceDepartment: inputs.provinceDepartment ? false : true,
		city: inputs.city ? false : true,
		zipCode: !zipCodeRegEx.test(inputs.zipCode),
	});

	const [disable, setDisable] = useState(
		!(
			!error.name &&
			!error.lastname &&
			!error.email &&
			!error.phone &&
			!error.login_name &&
			!error.login_password &&
			!error.streetNumber &&
			!error.provinceDepartment &&
			!error.city &&
			!error.zipCode
		)
	);

	function handleChange(e) {
		e.preventDefault();
		setInputs({
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

	function handleSubmit(e) {
		e.preventDefault();
		setLoad(true);
		setInputs({
			...inputs,
			phone: parseInt(inputs.phone),
			isRegistered: true,
		});

		dispatch(createClient(inputs, setLoad));
		swal('Welcome', "You're registered!", 'success');
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

	if (load === true) {
		return <Loader />;
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
						<div className={style.validInput}>
							<input
								type='text'
								placeholder='Street and number'
								name='streetNumber'
								value={inputs.address.streetNumber}
								onChange={(e) => {
									handleAdress(e);
								}}
							/>
							{!error.streetNumber && (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
										fontSize: '1.5rem',
										marginLeft: '0.5rem',
									}}
								/>
							)}
						</div>

						{error.streetNumber && (
							<p className={style.error}>
								{'Street and number are required'}
							</p>
						)}

						<div className={style.validInput}>
							<input
								type='text'
								placeholder='City'
								name='city'
								value={inputs.address.city}
								onChange={(e) => {
									handleAdress(e);
								}}
							/>
							{!error.city && (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
										fontSize: '1.5rem',
										marginLeft: '0.5rem',
									}}
								/>
							)}
						</div>

						{error.city && (
							<p className={style.error}>
								{
									'Insert a valid city without special caracters or numbers'
								}
							</p>
						)}

						<div className={style.validInput}>
							<input
								type='text'
								placeholder='Zip Code'
								name='zipCode'
								value={inputs.address.zipCode}
								onChange={(e) => {
									handleAdress(e);
								}}
							/>
							{!error.zipCode && (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
										fontSize: '1.5rem',
										marginLeft: '0.5rem',
									}}
								/>
							)}
						</div>

						{error.zipCode && (
							<p className={style.error}>
								{'Zip code must be a 4 digits number'}
							</p>
						)}

						<div className={style.validInput}>
							<input
								type='text'
								placeholder='province'
								name='provinceDepartment'
								value={inputs.address.provinceDepartment}
								onChange={(e) => {
									handleAdress(e);
								}}
							/>
							{!error.provinceDepartment && (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
										fontSize: '1.5rem',
										marginLeft: '0.5rem',
									}}
								/>
							)}
						</div>

						{error.provinceDepartment && (
							<p className={style.error}>
								{'Province or department is required'}
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
						/>
					</div>
				</div>

				<div className={style.infoGlobal}>
					<label>Personal Information</label>
					<div className={style.infoContainer}>
						<div className={style.validInput}>
							<input
								type='text'
								placeholder='Name'
								name='name'
								value={inputs.name}
								onChange={(e) => {
									handleChange(e);
								}}
							/>
							{!error.name && (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
										fontSize: '1.5rem',
										marginLeft: '0.5rem',
									}}
								/>
							)}
						</div>

						{error.name && (
							<p className={style.error}>
								{
									'Insert a valid name without special caracters or numbers'
								}
							</p>
						)}

						<div className={style.validInput}>
							<input
								type='text'
								placeholder='Last name'
								name='lastname'
								value={inputs.lastname}
								onChange={(e) => {
									handleChange(e);
								}}
							/>
							{!error.lastname && (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
										fontSize: '1.5rem',
										marginLeft: '0.5rem',
									}}
								/>
							)}
						</div>

						{error.lastname && (
							<p className={style.error}>
								{
									'Insert a valid lastname without special caracters or numbers'
								}
							</p>
						)}

						<div className={style.validInput}>
							<input
								type='text'
								placeholder='e-mail'
								name='email'
								value={inputs.email}
								onChange={(e) => {
									handleChange(e);
								}}
							/>
							{!error.email && (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
										fontSize: '1.5rem',
										marginLeft: '0.5rem',
									}}
								/>
							)}
						</div>

						{error.email && (
							<p className={style.error}>
								{'insert a valid email'}
							</p>
						)}

						<div className={style.validInput}>
							<input
								type='number'
								placeholder='Phone number'
								name='phone'
								value={inputs.phone}
								onChange={(e) => {
									handleChange(e);
								}}
							/>
							{!error.phone && (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
										fontSize: '1.5rem',
										marginLeft: '0.5rem',
									}}
								/>
							)}
						</div>

						{error.phone && (
							<p className={style.error}>
								{'Insert a valid phone number, only numbers'}
							</p>
						)}
					</div>
				</div>

				<div className={style.logInGlobal}>
					<label>Log in</label>

					<div className={style.validInput}>
						<input
							type='text'
							placeholder='Type username'
							name='login_name'
							value={inputs.login_name}
							onChange={(e) => {
								handleChange(e);
							}}
						/>
						{!error.login_name && (
							<FontAwesomeIcon
								icon={faSquareCheck}
								style={{
									color: 'green',
									fontSize: '1.5rem',
									marginLeft: '0.5rem',
								}}
							/>
						)}
					</div>

					{error.login_name && (
						<p className={style.error}>{'Insert a login name'}</p>
					)}

					<div className={style.validInput}>
						<input
							type='password'
							placeholder='Type password'
							name='login_password'
							value={inputs.login_password}
							onChange={(e) => {
								handleChange(e);
							}}
						/>
						{!error.login_password && (
							<FontAwesomeIcon
								icon={faSquareCheck}
								style={{
									color: 'green',
									fontSize: '1.5rem',
									marginLeft: '0.5rem',
								}}
							/>
						)}
					</div>

					{error.login_password && (
						<p className={style.error}>{'Insert a password'}</p>
					)}
				</div>

				<div className={style.submit}>
					{!disable && <button type='submit'>Sign Up</button>}
				</div>
			</form>
		</div>
	);
}
