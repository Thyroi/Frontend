<<<<<<< Updated upstream
import React from 'react'

export default function Landing() {
  return (
    <div>Landing</div>
  )
=======
import React from 'react';
import styles from 'Landing.module.css';

export default function Landing() {
	return (
		<div className={styles.global}>
			<div className={styles.top}>Top</div>
			<div className={styles.left}>Left</div>
			<div className={styles.container}>Site</div>
		</div>
	);
>>>>>>> Stashed changes
}
