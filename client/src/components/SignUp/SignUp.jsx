import React, { useEffect, useState, useMemo } from 'react'
import {useDispatch} from 'react-redux'
import { createClient } from '../../actions';
import style from './SignUp.module.css'

export default function SignUp(params) {

    const dispatch = useDispatch()
      
    const [error, setError] = useState({})

    const [direc, setDirec] = useState({
        calle: "",
        numero: "",
        city: "",
        zip_code: ""
    })
    
    const [inputs, setInputs] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        login_name: "",
        login_password: "",
        adress: {}
    })

    useEffect(() => {
        setError(validator(inputs, direc))
    }, [inputs, direc])

    function handleChange(e){
        e.preventDefault();    
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
        
        setError({
            ...inputs,
            ...direc,
            [e.target.name]: e.target.value
        })
    } 

    function handleChangeAdress(e){
        e.preventDefault()
        setDirec({
            ...direc,
            [e.target.name]: e.target.value
        })

        setError({
            ...inputs,
            ...direc,
            [e.target.name]: e.target.value
        })

        setInputs({
            ...inputs,
            adress: {...direc} 
        })
    }

    function validator(inputs, direc){
        let error = {}
        if(!inputs.name){
            error.name = "Name is required"
        } else if (typeof inputs.name !== "string"){
            error.name = "Insert a valid name (without special caracters or numbers)"
        } else if (!inputs.lastname){
            error.lastname = "Lastname is required"
        } else if (typeof inputs.lastname !== "string"){
            error.lastname = "Insert a valid lastname (without special caracters or numbers)"
        }  else if (!inputs.email){
            error.email = "Email is required"
        } else if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(inputs.email) === false){
            error.email = "Email should be a valid email"
        } else if (!inputs.phone){
            error.phone = "Phone is required"
        } else if (!inputs.login_name){
            error.login_name = "Login name is required"
        }  else if (!inputs.login_password){
            error.login_password = "Password is required"
        } else if (!direc.calle){
            error.calle = "Street is required"
        } else if (!direc.numero){
            error.numero = "Street number is required"
        } else if(!direc.city){
            error.city = "City is required"
        } else if (typeof direc.city !== "string"){
            error.city = "Insert a valid city (without special caracters or numbers)"
        } else if(!direc.zip_code){
            error.zip_code = "Zip code is required"
        } 
        return error
    }

    const disable = useMemo(() => {
        if(error.name || error.lastname || error.phone || error.email || error.login_name || error.login_password || error.calle || error.numero || error.city || error.zip_code){
            return true
        } return false},
        [error])

    function handleSubmit(e){
        e.preventDefault();
        console.log(inputs)
        dispatch(createClient(inputs))
        /* setInputs({
            name: "",
            lastname: "",
            email: "",
            phone: "",
            login_name: "",
            login_password: "",
            adress: {},
        })
        /* params.history.push("http://localhost:3001/products") */
    }

  return (
    <div >
        <form onSubmit={(e) => {handleSubmit(e)}} className={style.conteiner}>
        <label>Name</label>
        <input type="text" placeholder='Name' name='name' value={inputs.name} onChange={(e) => {handleChange(e)}}/>
        {error.name && (<p>{error.name}</p>)}
        <label>Last Name</label>
        <input type="text" placeholder='Last Name' name='lastname' value={inputs.lastname} onChange={(e) => {handleChange(e)}}/>
        {error.lastname && (<p>{error.lastname}</p>)}
        <label>Email</label>
        <input type="text" placeholder='Email' name='email' value={inputs.email} onChange={(e) => {handleChange(e)}}/>
        {error.email && (<p>{error.email}</p>)}
        <label>Phone</label>
        <input type="number" placeholder='Phone' name='phone' value={inputs.phone} onChange={(e) => {handleChange(e)}}/>
        {error.phone && (<p>{error.phone}</p>)}
        <label>Login Name</label>
        <input type="text" placeholder='Login Name' name='login_name' value={inputs.login_name} onChange={(e) => {handleChange(e)}}/>
        {error.login_name && (<p>{error.login_name}</p>)}
        <label>Password</label>
        <input type="password" placeholder='Login password' name='login_password' value={inputs.login_password} onChange={(e) => {handleChange(e)}}/>
        {error.login_password && (<p>{error.login_password}</p>)}
        <label>Adress</label>
        <div>
            <label>Street</label>
            <input type="text" placeholder='Street' name='calle' value={direc.calle} onChange={(e) => {handleChangeAdress(e)}}/>
            {error.calle && (<p>{error.calle}</p>)}
            <label>Number</label>
            <input type="text" placeholder='Number' name='numero' value={direc.numero} onChange={(e) => {handleChangeAdress(e)}}/>
            {error.numero && (<p>{error.numero}</p>)}
            <label>City</label>
            <input type="text" placeholder='City' name='city' value={direc.city} onChange={(e) => {handleChangeAdress(e)}}/>
            {error.city && (<p>{error.city}</p>)}
            <label>Zip Code</label>
            <input type="text" placeholder='Zip Code' name='zip_code' value={direc.zip_code} onChange={(e) => {handleChangeAdress(e)}}/>
            {error.zip_code && (<p>{error.zip_code}</p>)}
        </div>
        <button disabled={disable} type="submit" >CREATE PROFILE</button>  
        </form>
    </div>
  )
}
