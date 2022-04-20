import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import style from './LoginMain.module.scss';
import { GoogleLogin } from 'react-google-login';
import {
	createClientGoogle,
	logInUser,
	getCart,
	setRememberMe,
} from '../../actions';
import { sendReset } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import swal from 'sweetalert';

function LogInMain(params) {
	const dispatch = useDispatch();
  const [load, setLoad] = useState("false");

	const loggedInClient = useSelector((state) => state.loggedInClient);

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
		if (loggedInClient?.phone) {
			dispatch(getCart(loggedInClient.phone));
			params.history.push('/home');
		}
	}, [loggedInClient]);

	function responseGoogle(response) {
		const info = {
			name: response?.profileObj?.givenName,
			lastname: response?.profileObj?.familyName,
			email: response?.profileObj?.email,
		};
		dispatch(createClientGoogle(info));
		params.history.push('/signupgoogle');
	}

	function handleOnChange(e) {
		e.preventDefault();
		let { name, value } = e.target;
		setUser({ ...user, [name]: value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!user?.login_name || !user?.login_password) {
			swal("Please!", "Complete the fields", "warning");
      return;
		}
    setLoad("true");
		dispatch(logInUser(user, swal, setLoad));
	}

	function handleMailChange(e) {
		e.preventDefault();
		var { value } = e.target;
		setEmail(value);
	}

	function handleResetPass(e) {
		e.preventDefault();
		sendReset(email);

	}

  if(load === "true") {
    return <Loader />
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
							<h1 className={style.header}>Welcome back!</h1>
							<p className={style.subHeader}>
								It's great to have you back!
							</p>
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
							<div className={style.containerRememberMe}>
								<input
									className={style.buttonRemember}
									type='checkbox'
									name='rememberMe'
									onClick={() => dispatch(setRememberMe())}
								/>
								<label className={style.textRemember}>
									Remember me?
								</label>
							</div>
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
							<Link className={style.signUpButton} to='/signup'>
								Sign Up
							</Link>
							<GoogleLogin
								className={style.googleButton}
								clientId='969216311730-erq289787jpgirnsaro1cnd34vcikq20.apps.googleusercontent.com'
								buttonText='Login'
								onSuccess={responseGoogle}
								onFailure={responseGoogle}
								cookiePolicy={'single_host_origin'}
							/>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LogInMain;
