import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import useMercadoPago from '../../hooks/useMercadoPago';
//import Loader from '../../../Loader/Loader';

import { createGuestClient, purchaseOrder, saveCart } from '../../../../utils/utils';
import { clearCart } from '../../../../actions/index';

import style from './MercadoPagoForm.module.scss';

const init = {
	cvc: '',
	cardExpirationMonth: '',
	cardExpirationYear: '',
	focus: 'cardNumber',
	cardholderName: '',
	cardNumber: '',
	issuer: '',
};

export default function MercadoPagoForm() {
	const [state, setState] = useState(init);
	const resultPayment = useMercadoPago(); //custom hook
	const dispatch = useDispatch();
	const history = useHistory();
	const { phone } = useSelector((state) => state?.loggedInClient);

  //const [load, setLoad] = useState(false);

	const handleInputChange = (e) => {
		setState({
			...state,
			[e.target.dataset.name || e.target.name]: e.target.value,
		});
	};

	const handleInputFocus = (e) => {
		setState({ ...state, focus: e.target.dataset.name || e.target.name });
	};

	useEffect(() => {
		if(resultPayment && resultPayment.status) {
		 	purchaseOrder(resultPayment.status); 
			
		}
		if (resultPayment && resultPayment.status === 'approved') {
			localStorage.removeItem('cart');
			dispatch(clearCart());
			saveCart(phone, []);
		
			const element = document.querySelector('#cardState');

			if (resultPayment.status === 'approved') {
				element.classList.remove(style.containerResponseRejected);
				element.classList.remove(style.containerResponsePending);
				element.classList.add(style.containerResponseApproved);
			}
		}

		if (resultPayment && resultPayment.status === 'rejected') {
			// localStorage.removeItem("cart");
			// dispatch(clearCart());

			const header = 'Your order is rejected';
			const text =
				'Your order and payment have been rejected. Check your email to solve this problem.';

			const element = document.querySelector('#cardState');

			if (resultPayment.status === 'rejected') {
				element.classList.remove(style.containerResponseApproved);
				element.classList.remove(style.containerResponsePending);
				element.classList.add(style.containerResponseRejected);

				document.querySelector('#header').textContent = header;
				document.querySelector('#text').textContent = text;
			}
		}

		if (resultPayment && resultPayment.status === 'in_process') {
			localStorage.removeItem('cart');
			dispatch(clearCart());

			const header = 'Your order is in process';
			const text =
				"Your order is in process. We'll contact you soon, pay attention to your email";

			const element = document.querySelector('#cardState');

			if (resultPayment.status === 'in_process') {
				element.classList.remove(style.containerResponseApproved);
				element.classList.remove(style.containerResponseRejected);
				element.classList.add(style.containerResponsePending);

				document.querySelector('#header').textContent = header;
				document.querySelector('#text').textContent = text;
			}
		}
	}, resultPayment);

/*   if(load === true) return <Loader /> */

	return (
		<div className='cont'>
			<div className='card'>
				<Card
					cvc={state.cvc}
					expiry={
						state.cardExpirationMonth + state.cardExpirationYear
					}
					name={state.cardholderName}
					number={state.cardNumber}
					focused={state.focus}
					brand={state.issuer}
				/>
			</div>

			<form id='form-checkout'>
				<div className='form-control'>
					<input
						className='cardNum'
						type='tel'
						name='cardNumber'
						id='form-checkout__cardNumber'
						onChange={handleInputChange}
						onFocus={handleInputFocus}
					/>
					<div className='expiration'>
						<input
							className='expM'
							type='tel'
							name='cardExpirationMonth'
							id='form-checkout__cardExpirationMonth'
							onChange={handleInputChange}
							onFocus={handleInputFocus}
						/>
						{' / '}
						<input
							className='expY'
							type='tel'
							name='cardExpirationYear'
							id='form-checkout__cardExpirationYear'
							onChange={handleInputChange}
							onFocus={handleInputFocus}
						/>
					</div>

					<input
						className='sCode'
						type='tel'
						name='cvc'
						id='form-checkout__securityCode'
						onChange={handleInputChange}
						onFocus={handleInputFocus}
					/>

					<input
						className='cName'
						type='text'
						name='cardholderName'
						id='form-checkout__cardholderName'
						onChange={handleInputChange}
						onFocus={handleInputFocus}
					/>
					<input
						className='email'
						type='email'
						name='cardholderEmail'
						id='form-checkout__cardholderEmail'
						onFocus={handleInputFocus}
					/>

					<select
						name='issuer'
						id='form-checkout__issuer'
						className='bank'></select>
					<select
						name='identificationType'
						id='form-checkout__identificationType'
						className='idType'></select>

					<input
						type='text'
						name='identificationNumber'
						id='form-checkout__identificationNumber'
						className='idNum'
					/>

					<select
						name='installments'
						id='form-checkout__installments'
						className='inst'></select>
					<button
						type='submit'
						id='form-checkout__submit'
						className='pay'
						onClick={() => {
              /* setLoad(true); */
							const button = document.querySelector(
								'#form-checkout__submit'
							);
							if (
								button &&
								button.id === 'form-checkout__submit'
							) {
								createGuestClient(/* setLoad */);
								document.querySelector(
									'#form-checkout__submit'
								).textContent = 'Go back';
								document.querySelector(
									'#form-checkout__submit'
								).id = 'back';
								return;
							}

							localStorage.removeItem('cart');
							dispatch(clearCart());
							history.push('/home');
						}}>
						Pay
					</button>
				</div>
			</form>
			{resultPayment && (
				<div className='response'>
					<div
						className={style.containerResponseApproved}
						id='cardState'>
						<h2 className={style.headerResponse} id='header'>
							Your order is confirmed
						</h2>
						<div className={style.line}></div>
						<p className={style.textResponse} id='text'>
							Your order and payment have been confirmed. Check
							your email to track your products
						</p>
						<h3 className={style.subHeader}>Status of payment</h3>
						<ul className={style.listInfo}>
							<li
								className={
									style.listItems
								}>{`Status: ${JSON.stringify(
								resultPayment.status
							)}`}</li>
							<li
								className={
									style.listItems
								}>{`Status detail: ${JSON.stringify(
								resultPayment.status_detail
							)}`}</li>
							<li
								className={
									style.listItems
								}>{`Payment id: ${JSON.stringify(
								resultPayment.id
							)}`}</li>
						</ul>
						{}
					</div>
				</div>
			)}
		</div>
	);
}
