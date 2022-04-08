import React, { useEffect, useState } from 'react'

import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux'
import { getAllUsers, deleteUser, updatePermission, getSelectorsCat,addNewUser, addCategory } from '../actions'
import style from './AdminDashBoard.module.css'

function AdminDashBoard() {
    const [users, setUsers] = useState('')

    const [newCategory, setNewCategory] = useState({
        id_category: '',
        name: '',
        parent: ''
    })
    const [newUser, setnewUser] = useState({
        user_name: '',
        user_password: '',
        rol: ''
    })
    const allUser = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers()) 
        dispatch(getSelectorsCat())
    },[dispatch])

    const removeFunction = e => {
        dispatch(deleteUser({
            id_user: e.target.value
        }));
        setTimeout(() => {dispatch(getAllUsers())}, 1000)
        
    }
    const selectUserType = (e) => {
        e.preventDefault();
        setUsers(e.target.value)
    }
    const updateUser = (e) => {
        e.preventDefault();
        if(users === '1'){
           dispatch(updatePermission({
               id_user: e.target.value,
                rol: 'admin'
           }))
       }else if (users === '2'){
              dispatch(updatePermission({
                id_user: e.target.value,
                rol: 'employee'
              }))
       }else {
           return <div>nada por aqui</div>
       }
    
       dispatch(getAllUsers())
    }
    const selectCatType = (e) => {
        e.preventDefault();
        setNewCategory({
            ...newCategory,
            parent: parseInt(e.target.value)
        })
    }
    const nameNewCategory = (e) => {
        e.preventDefault();
        setNewCategory({
            ...newCategory,
            name: e.target.value,
        })
    }
    const idCateg = (e) => {
        e.preventDefault();
        setNewCategory({
            ...newCategory,
            id_category: parseInt(e.target.value),
        })
    }
    const addNewCategory = (e) => {
        e.preventDefault();
        dispatch(addCategory(newCategory))
        setNewCategory({
        id_category: '',
        name: '',
        parent: ''
        })
    }
    const settingName = (e) => {
        e.preventDefault();
        setnewUser({
            ...newUser,
            user_name: e.target.value,
        })
    }
    const settingPassword = (e) => {
        e.preventDefault();
        setnewUser({
            ...newUser,
            user_password: e.target.value,
        })
    }
    const selectRol = (e) => {
        e.preventDefault();
        setnewUser({
            ...newUser,
            rol: e.target.value,
        })
    }
    const handleSubmitAccion = (e) => {
        e.preventDefault();
        dispatch(addNewUser(newUser))
        setnewUser({
            user_name: '',
            user_password: '',
            rol: ''
        })
        setTimeout(() => {dispatch(getAllUsers())}, 1000)
    }

    return (
    <div className={style.divContainerAdmin}>
        <div>
            {allUser.lenght <= 0  ? <div>Nada por aqui</div> 
            : allUser.map(user => {
                return (
                <div className={style.cardUser} key={user.id_user}>
                    <p>{user.id_user}</p>
                    <p>{user.user_name}</p>
                    <p>{user.rol}</p>
                   
                   
                    <select onChange={selectUserType}>
                        <option value=''>Select Rol</option>
                        <option value="1">Admin</option>
                        <option value="2">Employee</option>
                    </select>
                    <button  value={user.id_user} onClick={(e) => updateUser(e)}>Change User</button>

                    <button className={style.deleteUser} value={user.id_user} onClick={e => removeFunction(e)}>❌</button>
                    </div>)})
            }
        </div>
        <div>
        <p>Crear Nuevo Usuario</p>
        <input onChange={settingName} value={newUser.user_name} placeholder='Ingresar nombre'></input>
        <input type='password' placeholder='Ingresar Contraseña'  onChange={settingPassword} value={newUser.user_password}></input>
        <select onChange={selectRol}>
            <option value=''>Select New Rol</option>
            <option value='admin'>Admin</option>
            <option value='employee'>Employee</option>
        </select>
        <button onClick={handleSubmitAccion}>Crear Usuario</button>
        </div>

    <div className={style.createCat}>
        <p>Crear Categoria</p>
        <input  value={newCategory.name} onChange={nameNewCategory} placeholder='Ingrese Categoria'></input>
        <select onChange={selectCatType}>
                        <option value=''>Select Type</option>
                        <option value="1">Women</option>
                        <option value="2">Men</option>
                    </select>
                    <input
                    value={newCategory.id_category} onChange={idCateg} placeholder='Ingrese ID'
                    ></input>
        <button onClick={addNewCategory}>Crear Categoria</button>
    </div>
   
</div>
  )
}

export default AdminDashBoard