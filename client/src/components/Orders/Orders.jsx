import React, { useEffect, useState } from "react";
import style from "./Orders.module.scss";

import Quantity from "../Quantity/Quantity";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { totalDue, prepareProduct, getOrders } from "../../utils/utils";

function Orders() {
  const itemsCart = useSelector((state) => state.cart);

  const [orders, setOrders] = useState([]);
  const phone = useSelector((state) => state.loggedInClient.phone);
  const dispatch = useDispatch();
  
  useEffect(() => {
    let hpone = 3144459829;
    getOrders(hpone).then((res) => {
      setOrders(res);
      console.log(res);
    });
  }, []);

  if(!orders) return <div>Loading</div>

  return (
    <div className={style.containerCart}>
			{orders &&
				orders.map((o) => {
          const { orderStatus, orderId, createdAt, total } = o;
					return (
						<div>
              <p>{orderStatus}</p>
              <p>{createdAt}</p>
              <p>{orderId}</p>
              <p>{`$${total}`}</p>

              {o.orderDetails.map((p) => {
                const {color, image, price, quantity, size} = p;
                return (
                  <div>
                    <div>
                      <img src={image} alt="product" />
                    </div>
                    <div>
                      <h2>Name</h2>
                      <p>{color}</p>
                      <p>{size}</p>
                      <p>{quantity}</p>
                      <p>{price}</p>
                    </div>
                  </div>
                )
              })}
            </div>
					);
				})}
		</div>
  );
}

export default Orders;
