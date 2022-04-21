import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import style from './Orders.module.scss';

import { getOrders } from '../../utils/utils';

function Orders() {
	const [orders, setOrders] = useState([]);
	let phone = useSelector((state) => state.loggedInClient.phone);

	useEffect(() => {
		getOrders(phone).then((res) => {
			setOrders(res);
			console.log(res);
		});
	}, []);

	if (!orders) return <div>Loading</div>;
	if (!orders.length)
		return (
			<div className={style.empty}>
				No hay registros en tu historial de compras
			</div>
		);

	return (
		<div className={style.containerOrders}>
			{orders &&
				orders.map((o) => {
					const { orderStatus, orderId, createdAt, total } = o;
					return (
						<div className={style.containerOrder}>
							<p className={style.orderStatus}>{orderStatus}</p>
							<p className={style.orderDate}>{createdAt}</p>
							<p
								className={
									style.orderId
								}>{`Order id: $${orderId}`}</p>
							<p className={style.orderTotal}>{`$${parseInt(
								total
							).toFixed(2)}`}</p>

							<div className={style.containerItems}>
								{o.orderDetails.map((p) => {
									const {
										color,
										image,
										price,
										quantity,
										size,
										name,
									} = p;
									return (
										<div className={style.containerItem}>
											<div
												className={
													style.containerImage
												}>
												<img
													className={style.img}
													src={image}
													alt='product'
												/>
											</div>
											<div
												className={style.containerInfo}>
												<h2 className={style.itemName}>
													{name || `Change`}
												</h2>
												<p
													className={
														style.itemColor
													}>{`Color: ${color}`}</p>
												<p
													className={
														style.itemSize
													}>{`Size: ${size}`}</p>
												<p
													className={
														style.itemQuantity
													}>{`Units: ${quantity}`}</p>
												<p
													className={
														style.itemPrice
													}>{`$${parseFloat(
													price
												).toFixed(2)}`}</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default Orders;
