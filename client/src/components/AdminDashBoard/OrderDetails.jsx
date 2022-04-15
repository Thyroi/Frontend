
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import swal from '@sweetalert/with-react'
import {  getOrdersById, UpdateOrder } from '../../actions'
import styles from './AdminDashBoard.module.css'


function OrderDetails() {
    const {id} = useParams()
    const orden = useSelector(state => state.orderDetail)

    const dispatch = useDispatch()

  
    
    useEffect(() => {
        dispatch(getOrdersById(parseInt(id)));
        
    },[dispatch, id])
    

	function seeAlert (e) {
		e.preventDefault()
        swal(
		<div>
			<h1>Order Details</h1>
            {orden?.orderDetails?.map(d => {return(
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
            </table>)})
            
            }
			<h1>Total: $ {orden?.total}</h1>
		</div>)
	}
    
 

    function changingOrder (e) {
        
        e.preventDefault()
        console.log(e.target.value)
        dispatch(UpdateOrder(id, {
            
            orderStatus: e.target.value
            
        }))
        swal("Done!", "You changed the status", "success");
        setTimeout(() => {
			dispatch(getOrdersById(id));
		}, 1000);
    }
  return (
    <div> 
        <table className={styles.tableOrder}>
            <thead>
                <tr> 
                <th>Order Id</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Addres</th>
                <th>City</th>
                <th>Zip</th>
                <th>Order Status</th>
                <th>View Order Details</th>
                </tr>
            </thead>
            <tbody>
               
                    { orden && <tr>
                    <td> {orden?.orderId}</td>
                     <td> {orden?.Client?.name}</td> 
                    <td> {orden?.Client?.lastname}</td> 
                    <td> {orden?.ClientPhone}</td>
                    <td> {orden?.address?.streetNumber}</td>
                    <td> {orden?.address?.city}</td>
                    <td>{orden?.address?.zipCode}</td>
                    <td>
                       {orden?.orderStatus}
                    </td>
                    <td><button onClick={seeAlert}>See Order Details</button></td> 
                </tr> }
            </tbody>
        </table>
        <div >
            <span className={styles.textOrder}>Order Productos</span>
            <div className={styles.imageDetail}>
            {
                orden && orden?.orderDetails?.map(d => {
                    return(
                        <div   key={d.productid}>
                            <Link to={`/products/${d.productid}`}>
                            <img className={styles.imagenProd} src={ d.image} alt={d.productid}/>
                            </Link>
                        </div>
                    )
                })
            }
            </div>
        </div>
        <div classname={styles.changeOrder}>
        <h3>Change Order Status</h3>
            {/* <select onChange={changingOrder}>
                <option value="Canceled">Canceled</option>
                <option value="Submited">Submited</option>
                <option value="Completed">Completed</option>
                <option value="Processing">Processing</option>
            </select> */}
            <button className={styles.buttonChange} onClick={changingOrder} value="Canceled">Canceled</button>
            <button className={styles.buttonChange} onClick={changingOrder} value="Submited">Submited</button>
            <button  className={styles.buttonChange} onClick={changingOrder} value="Completed">Completed</button>
            <button className={styles.buttonChange} onClick={changingOrder} value="Processing">Processing</button>
            </div>
     </div>
  )
}

export default OrderDetails