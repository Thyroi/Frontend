import React from 'react';
import styles from './AdminProfile.module.css';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import BarChart from '../BarChart/BarChart';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faEye,
	faAddressCard,
	faSackDollar,
	faShirt,
	faStar,
} from '@fortawesome/free-solid-svg-icons';

function AdminProfile() {
	let history = useHistory();
	const allproducts = useSelector((state) => state.allproducts);

	const users = 4;

	const compOrd = 2750;
	const penOrd = 125;
	const submOrd = 7543;
	const cancOrd = 521;

	const monthlyRev = [
		{ month: 'Jan', revenue: 10 },
		{ month: 'Feb', revenue: 20 },
		{ month: 'Mar', revenue: 50 },
		{ month: 'Apr', revenue: 80 },
		{ month: 'May', revenue: 90 },
		{ month: 'Jun', revenue: 100 },
		{ month: 'Jul', revenue: 100 },
		{ month: 'Aug', revenue: 140 },
		{ month: 'Sep', revenue: 170 },
		{ month: 'Oct', revenue: 250 },
		{ month: 'Nov', revenue: 200 },
		{ month: 'Dec', revenue: 220 },
	];

	let sum = 0;
	monthlyRev.forEach((rev) => {
		return (sum += rev.revenue);
	});
	const [visits, clients, totIncome, itemsSold, avgRating] = [
		50873,
		5320,
		sum,
		12350,
		3.82,
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
				<div className={styles.content}>
					<p>
						Total products:{' '}
						{
							<span style={{ color: '#565656' }}>
								{allproducts.length}
							</span>
						}
					</p>{' '}
				</div>

				<button onClick={() => history.push('/addnewproduct')}>
					Add products
				</button>
				<button onClick={() => history.push('/admindashboard/offers')}>
					Offers
				</button>
			</div>

			<div className={styles.users}>
				<h4>Users</h4>
				<div className={styles.content}>
					<p>
						Total users:{' '}
						{<span style={{ color: '#565656' }}>{users}</span>}
					</p>{' '}
				</div>
				<button onClick={() => history.push('/admindashboard/users')}>
					Manage users
				</button>
			</div>

			<div className={styles.stats}>
				<h4>Stats</h4>
				<div className={styles.statsContent}>
					<div className={styles.stat}>
						<FontAwesomeIcon icon={faEye} />
						<label>Monthly visits</label>
						<span>{visits}</span>
					</div>

					<div className={styles.stat}>
						<FontAwesomeIcon icon={faAddressCard} />
						<label>Clients</label>
						<span>{clients}</span>
					</div>

					<div className={styles.stat}>
						<FontAwesomeIcon icon={faSackDollar} />
						<label>Total income</label>
						<span>{`$${totIncome}k`}</span>
					</div>

					<div className={styles.stat}>
						<FontAwesomeIcon icon={faShirt} />
						<label>Total items sold</label>
						<span>{itemsSold}</span>
					</div>

					<div className={styles.stat}>
						<FontAwesomeIcon icon={faStar} />
						<label>Average rating</label>
						<span>{avgRating}</span>
					</div>
				</div>
			</div>
			<div className={styles.orders}>
				<h4>Orders</h4>
				<div className={styles.content}>
					<p>
						Completed orders:{' '}
						{<span style={{ color: 'green' }}>{compOrd}</span>}
					</p>
					<p>
						Pending orders:{' '}
						{<span style={{ color: 'orange' }}>{penOrd}</span>}
					</p>
					<p>
						Submitted orders:{' '}
						{<span style={{ color: '#565656' }}>{submOrd}</span>}
					</p>
					<p>
						Cancelled orders:{' '}
						{<span style={{ color: 'red' }}>{cancOrd}</span>}
					</p>
				</div>
				<button onClick={() => history.push('/admindashboard/orders')}>
					See orders
				</button>
			</div>
		</div>
	);
}

export default AdminProfile;
