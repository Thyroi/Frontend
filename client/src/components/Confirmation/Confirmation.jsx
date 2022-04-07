import React from 'react';
import styles from './Confirmation.module.css';

function Confirmation(params) {
	//---------------INSERTAR NAVEGACIÓN AQUÍ PARSERO GONORREA MARICA JUEPUTA--------------------------//
	function handleValidate(e) {
		e.preventDefault();
		params.history.push('ACÁ ADENTRO METELE LO QUE QUERÉS GATITO');
	}
	//---------------INSERTAR NAVEGACIÓN AQUÍ PARSERO GONORREA MARICA JUEPUTA--------------------------//
	return (
		<div className={styles.container}>
			<h1>Welcome to our shop!</h1>
			<br />
			<p>Validate your e-mail hitting the button below...</p>
			<br />
			<br />
			<br />
			<button onClick={handleValidate}>Validate</button>
		</div>
	);
}

export default Confirmation;
