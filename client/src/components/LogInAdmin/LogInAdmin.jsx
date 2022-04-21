import React, { useEffect, useState, useMemo } from 'react';

import style from './LoginAdmin.module.scss';

import { logInAdmin } from '../../actions';
import { sendReset } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import swal from '@sweetalert/with-react';

function LogInMain(params) {
	const dispatch = useDispatch();

	const loggedInAdmin = useSelector((state) => state.loggedInAdmin);

	const [user, setUser] = useState({
		login_name: '',
		login_password: '',
	});

	const emailRegEx = useMemo(
		() => new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
		[]
	);

	const [email, setEmail] = useState('');

	useEffect(() => {
		if (loggedInAdmin?.id_user) {
			params.history.push('/admindashboard');
		}
	}, [loggedInAdmin]);

	function handleOnChange(e) {
		e.preventDefault();
		let { name, value } = e.target;
		setUser({ ...user, [name]: value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!user?.login_name || !user?.login_password) {
			swal('Alert!', 'Please fill all fields', 'warning');
		}
		dispatch(logInAdmin(user, setUser));
	}

	function handleMailChange(e) {
		e.preventDefault();
		var { value } = e.target;
		setEmail(value);
	}

	function handleResetPass(e) {
		e.preventDefault();
		sendReset(email, swal);
	}

	return (
		<div className={style.background}>
			<div className={style.container}>
				<div className={style.containerImage}>
					<img
						className={style.img}
						src={require('../../Assets/img/20-michael-scott-quotes-that-prove-he-s-the-best-boss-ever-u2.jpg')}
						alt=''
					/>
				</div>
				<form onSubmit={handleSubmit} className={style.containerForm}>
					<div className={style.subContainerForm}>
						<div className={style.containerHeader}>
							<h1 className={style.header}>Admin site</h1>
						</div>

						<div className={style.containerInput}>
							<label className={style.labelInput}>Username</label>
							<input
								onChange={handleOnChange}
								className={style.input}
								type='text'
								name='login_name'
								value={user.login_name}
								placeholder='Type username'
							/>
						</div>

						<div className={style.containerInput}>
							<label className={style.labelInput}>Password</label>
							<input
								onChange={handleOnChange}
								className={style.input}
								type='password'
								name='login_password'
								value={user.login_password}
								placeholder='Type password'
							/>
						</div>

						<div className={style.containerOptions}>
							<div className={style.dropdownContainer}>
								<span className={style.forgotText}>
									Forgot password?
								</span>
								<div className={style.dropdown}>
									<input
										onChange={handleMailChange}
										type='text'
										placeholder='Type a valid email address'
										value={email}
									/>
									<button
										onClick={handleResetPass}
										disabled={!emailRegEx.test(email)}>
										Send
									</button>
								</div>
							</div>
						</div>

						<div className={style.containerLoginSignUp}>
							<input
								className={style.loginButton}
								type='submit'
								value='Login'
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LogInMain;
