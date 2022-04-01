import React from 'react'
import { Link } from 'react-router-dom'


export default function Card({images, brand, collection, isOffer, price, stock, type, gender, size, description}) {
  return (
    <div className={styles.conteiner}>
        
        <div>
            <span>{/* {isOffer} */ true && "oferta"}</span>
            <Link to={`/home/no se que variable va aca`}>
                <img src={images} alt="ACA VA LA FOTO" />
            </Link>
        </div>
        <div>
            <span>{type}</span>
        </div>
        <div>
            <span>{brand}</span>
            <span>{collection}</span>
        </div>
        <div>
            <span>{price}</span>
        </div>
        <div>
            <span>{stock}</span>
        </div>

    </div>
  )
}
