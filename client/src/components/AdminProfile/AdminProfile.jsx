import React from 'react';
import styles from './AdminProfile.module.css';
import { useHistory } from 'react-router-dom';

import BarChart from '../BarChart/BarChart';

function AdminProfile() {
	let history = useHistory();
	const monthlyRev = [
		{ month: 'Jan', revenue: 10 },
		{ month: 'Feb', revenue: 20 },
		{ month: 'Mar', revenue: 30 },
		{ month: 'Apr', revenue: 40 },
		{ month: 'May', revenue: 50 },
		{ month: 'Jun', revenue: 60 },
		{ month: 'Jul', revenue: 70 },
		{ month: 'Aug', revenue: 80 },
		{ month: 'Sep', revenue: 90 },
		{ month: 'Oct', revenue: 100 },
		{ month: 'Nov', revenue: 110 },
		{ month: 'Dec', revenue: 120 },
	];
	return (
		<div className={styles.container}>
			<div className={styles.revenue}>
				<h4>Revenue</h4>
				<div className={styles.content}>
					<BarChart monthlyRev={monthlyRev} />
				</div>
			</div>
			<div className={styles.products}>
				<h4>Products</h4>
				<div className={styles.content}>Here goes some content</div>
				<button onClick={() => history.push('/addnewproduct')}>
					Add products
				</button>
			</div>
			<div className={styles.stats}>
				<h4>Stats</h4>
				<div className={styles.content}>Here goes some content</div>
			</div>
			<div className={styles.orders}>
				<h4>Orders</h4>
				<div className={styles.content}>
					<p>Completed orders: </p>
					<p>Pending orders: </p>
					<p>Accepted orders: </p>
				</div>
				<button onClick={() => history.push('/admindashboard/users')}>
					See orders
				</button>
			</div>
		</div>
	);
}

export default AdminProfile;
