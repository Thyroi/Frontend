import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSquareCheck,
	faSquareXmark,
} from '@fortawesome/free-solid-svg-icons';

import style from './Form.module.scss';
//import { Link } from 'react-router-dom';

import { saveSendingData } from '../../actions/index';

function Form(params) {
	const client = useSelector((state) => state.loggedInClient);
	/* useEffect(() => {
		document
			.querySelector('#sendDataButton')
			.addEventListener('click', () => {
				saveSendingData();
			});
	}); */

	const emailRegEx = useMemo(
		() => new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
		[]
	);

	const zipCodeRegEx = useMemo(() => new RegExp(/^\d{4}$/), []);

	// address: {calle: 'Calle falsa', numero: '123', city: 'Mardel', zip_code: 7600'}
	// email: "pablo.rovito@outlook.com"
	// isRegistered: true
	// isVerified: false
	// lastname: "Rovito"
	// login_name: "rovito.pablito"
	// login_password: "pablo"
	// name: "Pablo"
	// newsletter: false
	// phone: "123456789"
	// token: "e9517134556897a978fe4b9e1d16dcb0"

	const [data, setData] = useState({
		name: client?.name || '',
		lastName: client?.lastname || '',
		eMail: client?.email || '',
		phoneNumber: parseInt(client?.phone) || '',
		streetNumber: client?.address?.calle + client?.address?.numero || '',
		city: client?.address?.city || '',
		zipCode: client?.address?.zip_code || '',
		provinceDepartament: '',
		particularDetails: '',
	});
	useEffect(() => {
		setValidate({
			n: data.name ? true : false,
			ln: data.lastName ? true : false,
			e: emailRegEx.test(data.eMail),
			p: data.phoneNumber ? true : false,
			sn: data.streetNumber ? true : false,
			c: data.city ? true : false,
			zc: zipCodeRegEx.test(data.zipCode),
			pd: data.provinceDepartament ? true : false,
		});
		setDisabled(
			!(
				validate.n &&
				validate.ln &&
				validate.e &&
				validate.p &&
				validate.sn &&
				validate.c &&
				validate.zc &&
				validate.pd
			)
		);
	}, [data]);

	const [validate, setValidate] = useState({
		n: false,
		ln: false,
		e: false,
		p: false,
		sn: false,
		c: false,
		zc: false,
		pd: false,
	});

	const [disabled, setDisabled] = useState(true);

	function handleChange(e) {
		e.preventDefault();
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
		
	}

	function handleSubmit(e) {
		e.preventDefault();
		(saveSendingData(data));
		return params.history.push('/cart/pay');
	}

	return (
		<div className={style.background}>
			<form onChange={handleChange} onSubmit={handleSubmit}>
				<div className={style.personalData}>
					<label className={style.label} id='name'>
						Name
					</label>
					<div className={style.inputCont}>
						<input
							name='name'
							value={data.name}
							className={style.input}
							type='text'
							placeholder='Write your name'
						/>
						<span style={{ marginLeft: '1em', fontSize: '1.5rem' }}>
							{validate.n ? (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
									}}
								/>
							) : (
								<FontAwesomeIcon
									icon={faSquareXmark}
									style={{
										color: 'red',
									}}
								/>
							)}
						</span>
					</div>

					<label className={style.label} id='lastname'>
						Last name
					</label>
					<div className={style.inputCont}>
						<input
							name='lastName'
							value={data.lastName}
							className={style.input}
							type='text'
							placeholder='Write your last name'
						/>
						<span style={{ marginLeft: '1em', fontSize: '1.5rem' }}>
							{validate.ln ? (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
									}}
								/>
							) : (
								<FontAwesomeIcon
									icon={faSquareXmark}
									style={{
										color: 'red',
									}}
								/>
							)}
						</span>
					</div>

					<label className={style.label} id='email'>
						e-mail
					</label>
					<div className={style.inputCont}>
						<input
							name='eMail'
							value={data.eMail}
							className={style.input}
							type='text'
							placeholder='Enter a valid e-mail'
						/>
						<span style={{ marginLeft: '1em', fontSize: '1.5rem' }}>
							{validate.e ? (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
									}}
								/>
							) : (
								<FontAwesomeIcon
									icon={faSquareXmark}
									style={{
										color: 'red',
									}}
								/>
							)}
						</span>
					</div>

					<label className={style.label} id='phone'>
						Phone number
					</label>
					<div className={style.inputCont}>
						<input
							name='phoneNumber'
							value={data.phoneNumber}
							className={style.input}
							type='number'
							placeholder='No spaces or special characters'
						/>
						<span style={{ marginLeft: '1em', fontSize: '1.5rem' }}>
							{validate.p ? (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
									}}
								/>
							) : (
								<FontAwesomeIcon
									icon={faSquareXmark}
									style={{
										color: 'red',
									}}
								/>
							)}
						</span>
					</div>
				</div>
				<div className={style.address}>
					<label className={style.label} id='calle'>
						Street and number
					</label>
					<div className={style.inputCont}>
						<input
							name='streetNumber'
							value={data.streetNumber}
							className={style.input}
							type='text'
							placeholder='Write your street and number'
						/>
						<span style={{ marginLeft: '1em', fontSize: '1.5rem' }}>
							{validate.sn ? (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
									}}
								/>
							) : (
								<FontAwesomeIcon
									icon={faSquareXmark}
									style={{
										color: 'red',
									}}
								/>
							)}
						</span>
					</div>

					<label className={style.label} id='city'>
						City
					</label>
					<div className={style.inputCont}>
						<input
							name='city'
							value={data.city}
							className={style.input}
							type='text'
							placeholder='Write your city'
						/>

						<span style={{ marginLeft: '1em', fontSize: '1.5rem' }}>
							{validate.c ? (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
									}}
								/>
							) : (
								<FontAwesomeIcon
									icon={faSquareXmark}
									style={{
										color: 'red',
									}}
								/>
							)}
						</span>
					</div>

					<label className={style.label} id='zip_code'>
						Zip code
					</label>
					<div className={style.inputCont}>
						<input
							name='zipCode'
							value={data.zipCode}
							className={style.input}
							type='text'
							placeholder='Write a 4-digit zip code'
						/>
						<span style={{ marginLeft: '1em', fontSize: '1.5rem' }}>
							{validate.zc ? (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
									}}
								/>
							) : (
								<FontAwesomeIcon
									icon={faSquareXmark}
									style={{
										color: 'red',
									}}
								/>
							)}
						</span>
					</div>

					<label className={style.label} id='state'>
						Province/department
					</label>
					<div className={style.inputCont}>
						<input
							name='provinceDepartament'
							value={data.provinceDepartament}
							className={style.input}
							type='text'
							placeholder='Write your province or department'
						/>
						<span style={{ marginLeft: '1em', fontSize: '1.5rem' }}>
							{validate.pd ? (
								<FontAwesomeIcon
									icon={faSquareCheck}
									style={{
										color: 'green',
									}}
								/>
							) : (
								<FontAwesomeIcon
									icon={faSquareXmark}
									style={{
										color: 'red',
									}}
								/>
							)}
						</span>
					</div>

					<label className={style.label} id='others'>
						Particular details
					</label>
					<div className={style.inputCont}>
						<input
							name='particularDetails'
							value={data.particularDetails}
							className={style.input}
							type='text'
							placeholder='A distinctive detail of your home'
						/>
					</div>
				</div>
				<div className={style.submits}>
					<input
						className={style.button}
						type='submit'
						value='Save data'
						id='saveNewData'
					/>

					{/* <Link to='/cart/pay'> */}
					<div className={style.inputCont}>
						{disabled && (
							<span style={{ marginRight: '1rem', color: 'red' }}>
								Check your inputs
							</span>
						)}
						<input
							disabled={disabled}
							className={style.button}
							type='submit'
							value='Confirm'
							id='sendDataButton'
						/>
					</div>

					{/* </Link> */}
				</div>
			</form>
		</div>
	);
}

export default Form;
