import React,{useState,useEffect} from 'react';
import {Container,Col,Row,Form,Button} from 'react-bootstrap';
import {useLocation,useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {forgotPassword,resetPassword} from '../../api/authAPI';
import {useDispatch,useSelector} from 'react-redux';
import {authPending,authFail,resetMessages} from './authSlice';
import {Alert,Loading} from '../../components';

const useQuery = () =>{
	return new URLSearchParams(useLocation().search);
}


const ForgotPassword = () =>{

	const history = useHistory();
	const dispatch = useDispatch();
	const {error,isLoading} = useSelector(state=>state.auth);
	let query = useQuery();
	const success = query.get('success');
	const mailid = query.get("email");
	const otpcode = query.get('otp');

	const initialState = {
		email:'',
		code:'',
		password:'',
		cf_password:''
	}

	const [userinfo,setUserInfo] = useState(initialState);
	const {email,code,password,cf_password} = userinfo;


	const handleChange = e =>{
		const {name,value} = e.target;
		setUserInfo({...userinfo,[name]:value});
	}

	useEffect(()=>{
		if(mailid && otpcode){
			setUserInfo({
				...userinfo,
				code:otpcode,
				email:mailid
			})
		}// eslint-disable-next-line
	},[mailid,otpcode])

	const verifyUser = async() =>{
		if(!email){
			return toast.error('Please provide your registered email')
		}
		dispatch(authPending());
		try {
			const dataVerified = await forgotPassword(email);
			toast.success(dataVerified.msg);
		} catch(error) {
			dispatch(authFail(error.response.data.msg));
		}
	}

	const resetUserPassword = async() =>{
		if(password !==cf_password){
			return toast.error('Password does not match');
		}
		if(!code || !email || !password){
			return toast.error('All Fields are required!');
		}
		dispatch(authPending());
		try {
			const updatedPass = await resetPassword(userinfo);
			toast.success(updatedPass.msg);
			dispatch(resetMessages())
			history.push('/');
		} catch(error) {
			dispatch(authFail(error.response.data.msg));
		}
	}

	return(
			<div className="forgotpass__main">
			{isLoading && <Loading />}
				<Container>
					<Row>
						<Col md={{span:6,offset:3}}>
							<h5 className="text-center">Forgot Password</h5>
								{error && <Alert message={error} type="danger"/>}
							  <Form.Group className="mb-3" controlId="formBasicEmail">
							    <Form.Label>Email address</Form.Label>
							    <Form.Control type="email" placeholder="Enter email" 
							    value={email}
							    onChange={handleChange}
							    name="email"
							    autoComplete="off"
							    />
							  </Form.Group>	
							  {
							  	success && (
							  		<>
									  <Form.Group className="mb-3" controlId="otpcontrol">
									    <Form.Label>OTP</Form.Label>
									    <Form.Control type="text" placeholder="Enter otp" 
									    value={code}
									    onChange={handleChange}
									    name="code"
									    autoComplete="off"
									    />
									  </Form.Group>	
									  <Form.Group className="mb-3" controlId="formBasicPassword">
									    <Form.Label>Password</Form.Label>
									    <Form.Control type="password" placeholder="Password" 
									    value={password}
									    onChange={handleChange}
									    name="password"
									    autoComplete="off"
									    />
									  </Form.Group>		
									  <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
									    <Form.Label>Confirm Password</Form.Label>
									    <Form.Control type="password" placeholder="Password" 
									    value={cf_password}
									    onChange={handleChange}
									    name="cf_password"
									    autoComplete="off"
									    />
									  </Form.Group>	
							  		</>
							  	)
							  }
							  <Button variant="primary" onClick={success ? resetUserPassword : verifyUser} type="button">
							  	Submit
							  </Button>
						</Col>
					</Row>
				</Container>
			</div>
		)
}

export default ForgotPassword;