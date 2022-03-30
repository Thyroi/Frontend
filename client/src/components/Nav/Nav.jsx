import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <div className={styles.conteiner}>
      <div className={styles.header}>
        <span>🏠</span>
        <span>Shop</span>
      </div>
      <div className={styles.links}>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/addProduct">Add Products</NavLink>
      </div>
      <div>
        <img src="" alt="aca va la imagen" />
      </div>
    </div>
  )
}

