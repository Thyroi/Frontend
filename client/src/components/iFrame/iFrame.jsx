import React from 'react';
import styles from './iFrame.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCamera,
	faThumbsUp,
	faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

function Confirmation({
	header = 'This is the header',
	title = 'This is the title',
	text = 'This is the text',
	button = true,
	button_text = 'Go!',
	handleClick = () => {
		window.location.href = 'http://localhost:3000';
	},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.frame}>
				<div className={styles.header}>{header}</div>
				<div className={styles.title}>
					<h1>{title}</h1>
				</div>
				<div className={styles.text}>
					<p>{text}</p>
				</div>
				{button && (
					<div className={styles.button}>
						<button onClick={handleClick}>{button_text}</button>
					</div>
				)}
				<div className={styles.footer}>
					<p>
						<FontAwesomeIcon
							icon={faCamera}
							style={{ color: '#e4687c' }}
						/>{' '}
						Instagram
					</p>
					<p>
						<FontAwesomeIcon
							icon={faThumbsUp}
							style={{ color: '#e4687c' }}
						/>{' '}
						Facebook
					</p>
					<p>
						<FontAwesomeIcon
							icon={faEnvelope}
							style={{ color: '#e4687c' }}
						/>{' '}
						Unsuscribe (meter el link)
					</p>
				</div>
			</div>
		</div>
	);
}

export default Confirmation;
