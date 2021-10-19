import React from 'react';
import {resetMessages} from '../pages/auth/authSlice';
import {useDispatch} from 'react-redux';


const Alert = ({message,type}) =>{

	const dispatch = useDispatch();

	const handleClose = () =>{
		dispatch(resetMessages());
	}

	return(
			<div className={`alert alert-${type ? type : 'success'} alert-dismissible fade show`} role="alert">
			  <strong>{message}</strong>
			  <button onClick={handleClose} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>
		)
}

export default Alert;