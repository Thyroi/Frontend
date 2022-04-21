import React, { useState } from 'react';
import style from './ResetPassword.module.scss';
import { resetPassword } from '../../utils/utils';
import swal from '@sweetalert/with-react';

function ResetPassword({ match }) {
	const { phone } = match.params;

	const [pass, setPass] = useState({
		login_password: '',
		login_password_val: '',
	});

	function handleOnChange(e) {
		e.preventDefault();
		let { name, value } = e.target;
		setPass({ ...pass, [name]: value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!pass?.login_password) {
			swal('Alert!', 'Cannot set an empty password', 'warning');
		} else if (pass?.login_password !== pass?.login_password_val) {
			swal('Alert!', "Passwords don't match", 'warning');
		} else {
			resetPassword(phone, pass.login_password, swal);
		}
	}

	return (
		<div className={style.background}>
			<div className={style.container}>
				<div className={style.containerImage}>
					<img
						className={style.img}
						src={require('../../Assets/img/login_side.jpg')}
						alt=''
					/>
				</div>
				<form onSubmit={handleSubmit} className={style.containerForm}>
					<div className={style.subContainerForm}>
						<div className={style.containerHeader}>
							<h1 className={style.header}>
								Need to change your password?
							</h1>
							<p className={style.subHeader}>
								If you forgot it, it looks like you are quite an
								imbecile. Hope you die, you whale abortion.
							</p>
						</div>

						<div className={style.containerInput}>
							<label className={style.labelInput}>
								New password
							</label>
							<input
								onChange={handleOnChange}
								className={style.input}
								type='password'
								name='login_password'
								value={pass.login_password}
								placeholder='Type your new password'
							/>
						</div>

						<div className={style.containerInput}>
							<label className={style.labelInput}>
								Retype new password
							</label>
							<input
								onChange={handleOnChange}
								className={style.input}
								type='password'
								name='login_password_val'
								value={pass.login_password_val}
								placeholder='Retype your new password'
							/>
						</div>

						{!pass.login_password ? (
							<span
								style={{
									color: 'red',
									fontSize: '0.8rem',
								}}>
								Cannot send an empty password
							</span>
						) : pass.login_password !== pass.login_password_val ? (
							<span
								style={{
									color: 'red',
									fontSize: '0.8rem',
								}}>
								Passwords must match
							</span>
						) : (
							<span
								style={{
									color: 'green',
									fontSize: '0.8rem',
								}}>
								You can submit
							</span>
						)}

						<div className={style.containerSubmit}>
							<input
								disabled={
									pass.login_password &&
									pass.login_password !==
										pass.login_password_val
								}
								className={style.submitButton}
								type='submit'
								value='Submit'
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ResetPassword;
