import React,{useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import {authPending,authFail,resetMessages} from './authSlice';
import {UserRegister} from '../../api/authAPI';
import {useDispatch,useSelector} from 'react-redux';
import {Loading,Alert} from '../../components';

const Register = () =>{

	const initialState = {
		email:'',
		username:'',
		password:'',
		cf_password:''
	}

	const dispatch = useDispatch();
	const {isLoading,error} = useSelector(state=>state.auth);

	const [data,setData] = useState(initialState);
	const {email,username,password,cf_password} = data;

	const handleChange = name => event =>{
		setData({...data,[name]:event.target.value})
	}

	const handleRegister = async e =>{
		e.preventDefault();
		if(!email || !username || !password || !cf_password){
			return toast.error('All fields are required!')
		}
		if(password !== cf_password){
			return toast.error('Password do not match');
		}
		dispatch(authPending());
		try {
			const registerUser = await UserRegister(data);
			toast.success(registerUser.msg);
			dispatch(resetMessages())
		} catch(error) {
			dispatch(authFail(error.response.data.msg));
		}
	}

	return(
		<>
		{isLoading && <Loading />}
			<div className="auth__login__main">
				<h5 className="text-center">G-Drive Register</h5>
				{error && <Alert message={error} type="danger"/>}
				<Form onSubmit={handleRegister}>
				  <Form.Group className="mb-3" controlId="formBasicUsername">
				    <Form.Label>Username</Form.Label>
				    <Form.Control type="text" placeholder="username" 
				    value={username}
				    onChange={handleChange('username')}
				    />
				  </Form.Group>					
				  <Form.Group className="mb-3" controlId="formBasicEmail">
				    <Form.Label>Email address</Form.Label>
				    <Form.Control type="email" placeholder="Enter email" 
				    value={email}
				    onChange={handleChange('email')}/>
				  </Form.Group>
				  <Form.Group className="mb-1" controlId="formBasicPassword">
				    <Form.Label>Password</Form.Label>
				    <Form.Control type="password" placeholder="Password" 
				    value={password}
				    onChange={handleChange('password')}
				    autoComplete="off"
				    />
				  </Form.Group>	
				  <Form.Group className="mb-1" controlId="formBasicPasswordConfirm">
				    <Form.Label>Confirm Password</Form.Label>
				    <Form.Control type="password" placeholder="ConfirmPassword" 
				    value={cf_password}
				    onChange={handleChange('cf_password')}
				    autoComplete="off"
				    />
				  </Form.Group>					  	
				  <div className="mb-1 registerlinks">
				  	<Link to='/'>Already have an account?</Link>
				  </div>		  
				  <Button variant="primary" type="submit">
				    Register
				  </Button>
				</Form>				
			</div>
		</>	
		)
}

export default Register;