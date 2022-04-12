import { React, useEffect } from 'react';
import style from './Notification.module.scss';

import { removeNotification } from '../../utils/utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Notification() {
	useEffect(() => {
		let notificationButton = document.querySelector('#closeButton');
		if (notificationButton)
			notificationButton.addEventListener('click', removeNotification);
	}, []);

	return (
		<div className={style.noNotification} id='notification'>
			<p className={style.text} id='textNotification'>
				Product added to cart
			</p>
			<button className={style.closeButton} id='closeButton'>
				<FontAwesomeIcon className={style.closeIcon} icon={faXmark} />
			</button>
		</div>
	);
}

export default Notification;
