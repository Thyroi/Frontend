import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllUsers, getOrders, orderFilter } from '../../actions/index';
import style from './AdminDashBoard.module.css';
// import swal from '@sweetalert/with-react'
import { Link } from 'react-router-dom';

function AdminDashBoard() {
	const dispatch = useDispatch();

	const orders = useSelector((state) => state.orders);

	useEffect(() => {
		dispatch(getAllUsers());

		dispatch(getOrders());
	}, [dispatch]);

	function handleFilterStatus(e) {
		e.preventDefault();
		dispatch(orderFilter(e.target.value));
	}
	function bringAllOrders(e) {
		e.preventDefault();
		dispatch(getOrders());
	}
	return (
		<div className={style.divContainerAdmin}>
			<div className={style.orders}>
				<h2>Orders</h2>
				<div className={style.orderHandlers}>
					<select onChange={handleFilterStatus}>
						<option value=''>Filter By Status</option>
						<option value='Canceled'>Canceled</option>
						<option value='Submited'>Submited</option>
						<option value='Completed'>Completed</option>
						<option value='Processing'>Processing</option>
					</select>
					<button onClick={bringAllOrders}>All orders</button>
				</div>
				<div style={{ margin: '1rem', width: '90%' }}>
					{' '}
					{orders?.map((order) => {
						return (
							<div
								key={order?.orderId}
								className={style.tableContainer}>
								<table className={style.tableOrder}>
									<thead>
										<tr>
											<th>Client</th>
											<th>Order status</th>
											{/* <th>Adress</th>
								<th>Phone Number</th> */}
											<th>Total </th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												{order?.Client.name}{' '}
												{order?.Client.lastname}
											</td>
											<td>{order?.orderStatus}</td>
											{/*<td>`{order.address.calle} {order.address.city} ZIP {order.address.zip_code}`</td>
								<td>{order.ClientPhone}</td> */}
											<td>$ {order?.total}</td>
											<td>
												<Link
													to={`/admindashboard/orders/${order?.orderId}`}>
													{' '}
													View detail
												</Link>{' '}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default AdminDashBoard;
