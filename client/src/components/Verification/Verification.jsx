import React from 'react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { verifyAccount } from '../../actions';
import {useDispatch } from 'react-redux';
import swal from 'sweetalert';

 function Verification() {
    const { token } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        swal({  title: "Congratulations!",
        text: "Your account has been verified correctly!",
        icon: "success",
        buttons: false, closeOnClickOutside: false, closeOnEsc: false, timer: 4000 });
        dispatch(verifyAccount(token));
        history.push('/login');
    }, [dispatch]);

    return (<div></div>)
};
export default Verification;
