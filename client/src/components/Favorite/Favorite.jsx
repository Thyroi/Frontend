import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import {
	getSpecificList,
	updateListDeleted,
	clearDetail
} from '../../actions';
import style from './Favorites.module.scss'

export default function Favorite({ match, history }){
    const client = useSelector((state) => state.loggedInClient);
    const fav = useSelector((state) => state.specificlist)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpecificList(client?.phone, "Favorite"))
		dispatch(clearDetail())
    },[dispatch])

    function handleDelete(e){
        const borrar = fav[0]?.List.filter((p) => p.id_product !== e.id_product)
        const updated = {
            id: parseInt(fav[0]?.id),
            ClientPhone: fav[0]?.ClientPhone,
            rList: borrar.map((p) => p.id_product),
            Colaborators: fav[0]?.Colaborators,
            title: fav[0]?.title
        }
        dispatch(updateListDeleted(updated))
        setTimeout(() => {
			dispatch(getSpecificList(client?.phone, "Favorite"));
		}, 1000);
    }

    return(
        <div className={style.containerList}>
            <h1>{fav[0]?.title}</h1>
            {fav &&
                fav[0]?.List.map(e => {
                    return(
                        <div 
                        key={e.id_product}
                        className={style.containerProduct}>
                        <div className={style.imgContainer}>
								{e.is_offer && (
									<span className={style.offer}>
										{'SALE'}
									</span>
								)}
								<Link to={`/products/${e.id_product}`}>
									<img
										className={style.productImage}
										src={e.default_image}
										alt=''
									/>
								</Link>
						</div>
                        <div className={style.infoContainer}>
								<div className={style.subInfoContainer}>
									<h3 className={style.nameProduct}>
										{e.name}
									</h3>
									<p
										className={style.productPrice}
										id='individualProductPrice'>
										{`$${e.price}`}
									</p>
									<p className={style.description}>
										{e.description}
									</p>
									<div className={style.buttonContainer}>
										<button
											onClick={() => {
												handleDelete(e);
											}}>
											Remove
										</button>
										
									</div>
								</div>
						</div>
                        </div>
                    )
                })
            }
        </div>
    )
}