import React from 'react';
import style from './Alert.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleExclamation,
	faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

//-------IMPORTANTE: PARA LA TRANSICIÓN EN MONTAJE/DESMONTAJE EN EL DOM SE NECESITARÍA http://reactcommunity.org/react-transition-group/ ----------//

function Alert({
	icon = 'alert',
	title = 'Title',
	text = 'Here goes some text',
	cancel_button = true,
	accept_onClick = () => {
		window.location.href = 'http://localhost:3000/home';
	},
	cancel_onClick = () => {
		window.location.href = 'http://localhost:3000/home';
	},
}) {
	return (
		<div className={style.container}>
			<div className={style.alert}>
				<div className={style.icon}>
					{icon === 'alert' ? (
						<FontAwesomeIcon
							icon={faCircleExclamation}
							style={{ fontSize: '3.5rem', color: '#e4687c' }}
						/>
					) : (
						<FontAwesomeIcon
							icon={faCircleCheck}
							style={{ fontSize: '3.5rem', color: 'forestgreen' }}
						/>
					)}
				</div>
				<div className={style.title}>
					<h1>{title}</h1>
				</div>
				<div className={style.text}>
					<p>{text}</p>
				</div>
				<div className={style.buttons}>
					{cancel_button && (
						<button
							onClick={cancel_onClick}
							className={style.cancel_button}>
							Cancel
						</button>
					)}
					<button
						onClick={accept_onClick}
						className={style.accept_button}>
						Accept
					</button>
				</div>
			</div>
		</div>
	);
}

export default Alert;
