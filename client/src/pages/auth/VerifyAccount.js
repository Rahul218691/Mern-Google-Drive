import React,{useEffect} from 'react';
import {Card,Spinner,Container,Row,Col} from 'react-bootstrap';
import {Link,useLocation,useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {activateAccount} from '../../api/authAPI';
import {Alert} from '../../components';
import {authPending,authFail,activationData} from './authSlice';


const useQuery = () =>{
	return new URLSearchParams(useLocation().search);
}

const VerifyAccount = () =>{

	const history = useHistory();
	let query = useQuery();
	const dispatch = useDispatch();
	const {message,error,isLoading} = useSelector(state=>state.auth);
	const verification = query.get("verify");

	const verifyUser = async() =>{
		dispatch(authPending());
		try {
			const verified = await activateAccount(verification);
			dispatch(activationData(verified.msg));
		} catch(error) {
			dispatch(authFail(error.response.data.msg));
		}
	}

	useEffect(()=>{
		if(!verification){
			history.push('/');
		}else{
			verifyUser()
		}// eslint-disable-next-line
	},[verification,history]);

	return(
		<Container>
			<Row>
				<Col md={{span:4,offset:4}}>
					<Card className="activationcard">
					  <Card.Body className="activationcard__body">
					  	<h5>Account Verification</h5>
					  	{isLoading ? <Spinner animation="border"/>
					  	 :message ? (
					  	 	<>
					  	 	<Alert message={message} type="success"/>
					  	 	<Link to='/' className="btn btn-primary">Login</Link>
					  	 	</>
					  	 	) : (
					  	 	<Alert message={error} type="danger"/>
					  	 	)}
					  </Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
		)
}

export default VerifyAccount;