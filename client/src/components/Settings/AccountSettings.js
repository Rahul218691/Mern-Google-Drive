import React,{useState} from 'react';
import { FaInfoCircle } from "react-icons/fa";
import {deleteUserAccount} from '../../api/userAPI';
import {useSelector,useDispatch} from 'react-redux';
import {Loading} from '../index';
import {toast} from 'react-toastify';
import {logout} from '../../api/authAPI';

const AccountSettings = () =>{

	const {auth} = useSelector(state=>state.auth);
	const dispatch = useDispatch();
	const [load,setLoad] = useState(false);

	const handleDeleteAccount = async() =>{
		if(window.confirm('Are You Sure deleting your account')){
			try{
				const calldelete = await deleteUserAccount(auth.token);
				if(calldelete){
					dispatch(logout());
					localStorage.removeItem('userdata');
					toast.success(calldelete.msg);
				}
				setLoad(false);
			}catch(err){
				toast.error(err.response.data.msg);
				setLoad(false);
			}			
		}
	}

	return(
			<div className="text-center">
				{load && <Loading />}
				<h4>Permanently Delete Account</h4>
				<p className="text-muted"><FaInfoCircle /> All your files will be removed if account be deleted.</p>
				<p className="text-muted"><FaInfoCircle /> Subscription Amount will not be refunded if account is deleted.</p>
				<button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
			</div>
		)
}

export default AccountSettings;