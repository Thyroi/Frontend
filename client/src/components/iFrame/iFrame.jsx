import React from 'react';
import styles from './iFrame.module.css';

function Confirmation({
	header = 'This is the header',
	title = 'This is the title',
	text = 'This is the text',
	button = 'Go!',
	handleClick = () => {
		window.location.href = 'http://localhost:3000';
	},
	footer = 'This is the footer',
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
				<div className={styles.button}>
					<button onClick={handleClick}>{button}</button>
				</div>
				<div className={styles.footer}>{footer}</div>
			</div>
		</div>
	);
}

export default Confirmation;
