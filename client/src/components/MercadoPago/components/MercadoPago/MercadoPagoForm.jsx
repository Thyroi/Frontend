import React, { useState } from 'react';
/* import Card from 'react-credit-cards'; */
/* import 'react-credit-cards/es/styles-compiled.css'; */
import useMercadoPago from '../../hooks/useMercadoPago';

import { createGuestClient, purchaseOrder } from '../../../../utils/utils';

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

	const handleInputChange = (e) => {
		setState({
			...state,
			[e.target.dataset.name || e.target.name]: e.target.value,
		});
	};

	const handleInputFocus = (e) => {
		setState({ ...state, focus: e.target.dataset.name || e.target.name });
	};

	return (
		<div className='cont'>
			<div className='card'>
				{/* <Card
					cvc={state.cvc}
					expiry={
						state.cardExpirationMonth + state.cardExpirationYear
					}
					name={state.cardholderName}
					number={state.cardNumber}
					focused={state.focus}
					brand={state.issuer}
				/> */}
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
              createGuestClient();
              purchaseOrder();
            }}
            >
						Pay
					</button>
				</div>
			</form>
			{resultPayment && (
				<div className='response'>
					<div className='resCont'>
						{JSON.stringify(resultPayment)}
					</div>
				</div>
			)}
		</div>
	);
}
