import React from 'react';
import styles from './AdminProfile.module.css';

function AdminProfile() {
	return (
		<div className={styles.container}>
			<div className={styles.revenue}>
				<h4>Revenue</h4>
				<div className={styles.content}>Here goes some content</div>
			</div>
			<div className={styles.products}>
				<h4>Products</h4>
				<div className={styles.content}>Here goes some content</div>
			</div>
			<div className={styles.stats}>
				<h4>Stats</h4>
				<div className={styles.content}>Here goes some content</div>
			</div>
			<div className={styles.customers}>
				<h4>Customers</h4>
				<div className={styles.content}>Here goes some content</div>
			</div>
		</div>
	);
}

export default AdminProfile;
