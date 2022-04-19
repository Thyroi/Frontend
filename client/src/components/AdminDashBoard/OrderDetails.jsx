import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import { getOrdersById, UpdateOrder } from '../../actions';
import styles from './AdminDashBoard.module.css';
import Dropdown from '../Dropdown/Dropdown';

function OrderDetails() {
	const { id } = useParams();
	const orden = useSelector((state) => state.orderDetail);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getOrdersById(parseInt(id)));
	}, [dispatch, id]);

	function seeAlert(e) {
		e.preventDefault();
		swal(
			<div>
				<h1>Order Details</h1>
				{orden?.orderDetails?.map((d) => {
					return (
						<table className={styles.tableOrder}>
							<tr>
								<th>Order</th>
								<th>Info</th>
							</tr>
							<tr>
								<td>Product ID</td>
								<td>{d.productid}</td>
							</tr>
							<tr>
								<td>Color</td>
								<td>{d.color}</td>
							</tr>
							<tr>
								<td>Size</td>
								<td>{d.size}</td>
							</tr>
							<tr>
								<td>Quantity</td>
								<td>{d.quantity}</td>
							</tr>
							<tr>
								<td>Price</td>
								<td>{d.price}</td>
							</tr>
						</table>
					);
				})}
				<h1>Total: $ {orden?.total}</h1>
			</div>
		);
	}

	function changingOrder(e) {
		e.preventDefault();
		console.log(e.target.value);
		dispatch(
			UpdateOrder(id, {
				orderStatus: e.target.value,
			})
		);
		swal('Done!', 'You changed the status', 'success');
		setTimeout(() => {
			dispatch(getOrdersById(id));
		}, 1000);
	}

	const orderStatus = [
		{ id: 0, name: 'Cancelled' },
		{ id: 1, name: 'Submitted' },
		{ id: 2, name: 'Completed' },
		{ id: 3, name: 'In process' },
	];
	return (
		<div className={styles.orderDetailContainer}>
			<h1>Order detail</h1>
			<div className={styles.orderData}>
				<div style={{ padding: '0.5rem' }}>
					<span>Order Id</span>
					<span> {orden?.orderId}</span>
				</div>
				<div style={{ padding: '0.5rem' }}>
					<span>Order Status</span>
					<span style={{ color: '#e4687c' }}>
						{orden?.orderStatus}
					</span>
				</div>
				<div className={styles.Dropdown}>
					<Dropdown
						placeHolder={'Order status'}
						options={orderStatus}
						handler={changingOrder}
					/>
				</div>
				<button onClick={seeAlert}>See Order Details</button>
			</div>

			<table className={styles.clientData}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Last Name</th>
						<th>Phone</th>
						<th>Address</th>
						<th>City</th>
						<th>Zip</th>
					</tr>
				</thead>
				<tbody>
					{orden && (
						<tr>
							<td> {orden?.Client?.name}</td>
							<td> {orden?.Client?.lastname}</td>
							<td> {orden?.ClientPhone}</td>
							<td> {orden?.address?.streetNumber}</td>
							<td> {orden?.address?.city}</td>
							<td>{orden?.address?.zipCode}</td>
						</tr>
					)}
				</tbody>
			</table>

			<div className={styles.imageDetail}>
				{orden &&
					orden?.orderDetails?.map((d) => {
						return (
							<div key={d.productid}>
								<Link to={`/products/${d.productid}`}>
									<img
										className={styles.imagenProd}
										src={d.image}
										alt={d.productid}
									/>
								</Link>
							</div>
						);
					})}
			</div>

			{/* <div classname={styles.changeOrder}>
				<button
					className={styles.buttonChange}
					onClick={changingOrder}
					value='Cancelled'>
					Canceled
				</button>
				<button
					className={styles.buttonChange}
					onClick={changingOrder}
					value='Submitted'>
					Submited
				</button>
				<button
					className={styles.buttonChange}
					onClick={changingOrder}
					value='Completed'>
					Completed
				</button>
				<button
					className={styles.buttonChange}
					onClick={changingOrder}
					value='In process'>
					Processing
				</button>
			</div> */}
		</div>
	);
}

export default OrderDetails;
