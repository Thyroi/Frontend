import React, { useEffect } from 'react';
import style from './Form.module.scss';
import { Link } from 'react-router-dom';

import { saveSendingData } from '../../actions/index';

function Form() {
	useEffect(() => {
		document
			.querySelector('#sendDataButton')
			.addEventListener('click', () => {
				saveSendingData();
			});
	});

	return (
		<div className={style.background}>
			<div className={style.personalData}>
				<label className={style.label} id='name'>
					Name
				</label>
				<input
					className={style.input}
					type='text'
					placeholder='Write your name'
				/>

				<label className={style.label} id='lastname'>
					Last name
				</label>
				<input
					className={style.input}
					type='text'
					placeholder='Write your lastname'
				/>

				<label className={style.label} id='email'>
					e-mail
				</label>
				<input
					className={style.input}
					type='text'
					placeholder='Write your email'
				/>

				<label className={style.label} id='phone'>
					Phone number
				</label>
				<input
					className={style.input}
					type='number'
					placeholder='Write your phone number'
				/>
			</div>

			<div className={style.address}>
				<label className={style.label} id='calle'>
					Street and number
				</label>
				<input
					className={style.input}
					type='text'
					placeholder='Write your street and number'
				/>

				<label className={style.label} id='city'>
					City
				</label>
				<input
					className={style.input}
					type='text'
					placeholder='Write your city'
				/>

				<label className={style.label} id='zip_code'>
					Zip code
				</label>
				<input
					className={style.input}
					type='text'
					placeholder='Write your zip code'
				/>

				<label className={style.label} id='state'>
					Province/department
				</label>
				<input
					className={style.input}
					type='text'
					placeholder='Write your province or department'
				/>

				<label className={style.label} id='others'>
					Particular details
				</label>
				<input
					className={style.input}
					type='text'
					placeholder='A detail that allows mail services to identify your home.'
				/>
			</div>

			<div className={style.submits}>
				<input
					className={style.button}
					type='submit'
					value='Save data'
					id='saveNewData'
				/>

				<Link to='/cart/pay'>
					<input
						className={style.button}
						type='submit'
						value='Confirm'
						id='sendDataButton'
					/>
				</Link>
			</div>
		</div>
	);
}

export default Form;
