import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {ChangePassword} from '../../api/userAPI';
import {useSelector} from 'react-redux';
import {Loading} from '../index';

const ChangeNewPassword = () =>{

	const [oldpass,setOldPass] = useState('');
	const [newpass,setNewPass] = useState('');
	const [confirmpass,setConfirmPass] = useState('');
	const [load,setLoad] = useState(false);
	const {auth} = useSelector(state=>state.auth);

	const handleSubmit = async(e) =>{
		e.preventDefault();
		if(!oldpass || !newpass || !confirmpass) return toast.error('All fields are required');
		if(newpass !== confirmpass) return toast.error('Password does not match');
		try{
			setLoad(true);
			const updatePass = await ChangePassword(oldpass,newpass,confirmpass,auth.token);
			if(updatePass){
				toast.success(updatePass.msg);
				setNewPass('');
				setConfirmPass('');
				setOldPass('');
			}
			setLoad(false);
		}catch(err){
			toast.error(err.response.data.msg);
			setLoad(false)
		}
	}

	return(
			<div className="changepass__main">
				{load && <Loading />}
				<Form onSubmit={handleSubmit}>
				  <Form.Group className="mb-3" controlId="oldpass">
				    <Form.Label>Old Password</Form.Label>
				    <Form.Control type="password" placeholder="******" autoComplete="off"
				    value={oldpass}
				    onChange={(e)=>setOldPass(e.target.value)}/>
				  </Form.Group>
				  <Form.Group className="mb-3" controlId="newpass">
				    <Form.Label>New Password</Form.Label>
				    <Form.Control type="password" placeholder="******" autoComplete="off"
				    value={newpass}
				    onChange={(e)=>setNewPass(e.target.value)}
				    />
				  </Form.Group>
				  <Form.Group className="mb-3" controlId="confirmpass">
				    <Form.Label>Confirm Password</Form.Label>
				    <Form.Control type="password" placeholder="******" autoComplete="off"
				    value={confirmpass}
				    onChange={(e)=>setConfirmPass(e.target.value)}/>
				  </Form.Group>				  				  
				  <Button variant="warning" type="submit">
				    Update Password
				  </Button>
				</Form>				
			</div>
		)
}

export default ChangeNewPassword;