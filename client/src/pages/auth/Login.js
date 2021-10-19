import React,{useState,useEffect} from 'react';
import {Form,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import {Userlogin} from '../../api/authAPI';
import {authPending,authSuccess,authFail} from './authSlice';
import {Loading,Alert} from '../../components';

const Login = () =>{

	const dispatch = useDispatch();
	const {isLoading,error} = useSelector(state=>state.auth);

	const initialState = {
		email:'',
		password:'',
		remember:false
	}

	const [data,setData] = useState(initialState);
	const {email,password,remember} = data;

	const handleChange = name => event =>{
		setData({...data,[name]:event.target.value})
	}

	const handleSubmitLogin = async e =>{
		e.preventDefault();
		if(!email || !password){
			return toast.error('All Fields Required!');
		}
		dispatch(authPending());
		try {
			const logUser = await Userlogin(data);
			let authdata = {
				token:logUser.access_token,
				user:logUser.user,
				plan:logUser.plans
			}
			dispatch(authSuccess(authdata));
			toast.success(logUser.msg);
			localStorage.setItem('firstLogin',true);
			if(remember){
				localStorage.setItem('userdata',JSON.stringify(data));
			}
		} catch(error) {
			dispatch(authFail(error.response.data.msg));
		}
	}

	useEffect(()=>{
		const parsed = JSON.parse(localStorage.getItem('userdata'));
		setData({
			...data,
			email:parsed?.email ? parsed.email : '',
			password:parsed?.password ? parsed.password : '',
			remember:parsed?.remember ? parsed.remember : false
		})// eslint-disable-next-line
	},[])

	return(
		<>
		{isLoading && <Loading />}
			<div className="auth__login__main">
				<h5 className="text-center">G-Drive Login</h5>
				{error && <Alert message={error} type="danger"/>}
				<Form onSubmit={handleSubmitLogin}>
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
				  <div className="auth__links mb-2">
				  	<Link to='/register'>New User? Click Here</Link>
				  	<Link to='/forgotpass'>ForgotPassword?</Link>
				  </div>		  
				  <Form.Group className="mb-3" controlId="formBasicCheckbox">
				    <Form.Check type="checkbox" label="Remember Me" 
				    checked={remember}
				    onChange={(e)=>setData({...data,remember:e.target.checked})}/>
				  </Form.Group>
				  <Button variant="primary" type="submit">
				    Login
				  </Button>
				</Form>				
			</div>
		</>	
		)
}

export default Login;