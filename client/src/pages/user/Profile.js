import React,{useState,useEffect,useRef} from 'react';
import {Container,Row,Col,Form,Button} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {authPending,authSuccess,authFail} from '../auth/authSlice';
import {updateUserProfile} from '../../api/userAPI';
import {toast} from 'react-toastify';
import {Loading,Alert} from '../../components';
import {Link} from 'react-router-dom';

const Profile = () =>{

	const {auth,isLoading,error} = useSelector(state=>state.auth);
	const imageRef = useRef();
	const dispatch = useDispatch();

	const initialState = {
		profile:'',
		email:'',
		username:'',
		image:''
	}

	const [userdata,setUserData] = useState(initialState);
	const {profile,email,username,image} = userdata;

	useEffect(()=>{
		setUserData({
			...userdata,
			profile:auth.user.profile,
			email:auth.user.email,
			username:auth.user.username
		})// eslint-disable-next-line
	},[auth.user])

	const handleImageProfile = () =>{
		imageRef.current.click()
	}

	const updateDetails = async() =>{
		let formdata = new FormData();
		formdata.append('profile',image);
		formdata.append('username',username);
		dispatch(authPending());
		try {
			const updateProfile = await updateUserProfile(formdata,auth.token);
			let authdata = {
				...auth,
				user:updateProfile.user
			}
			dispatch(authSuccess(authdata));
			toast.success(updateProfile.msg);
		} catch(error) {
			dispatch(authFail(error.response.data.msg));
		}
	}

	return(
			<div className="profile__comp">
			<Link className="btn btn-secondary" to='/home'>Go Home</Link>
			{isLoading && <Loading />}
				<Container>
					<Row>
						<Col md={{span:6,offset:3}} style={{textAlign:'center'}}>
							<h5 className="text-center">User Profile</h5>
							{error && <Alert message={error} type="danger"/>}
							<img onClick={handleImageProfile} src={profile} alt='' className="img-fluid profileImage"
							style={{width:'10rem',cursor:'pointer'}}/>
							<input ref={imageRef} type="file" style={{display:'none'}}
							onChange={(e)=>setUserData({...userdata,image:e.target.files[0]})}/>
							  <Form.Group className="mb-3 mt-2" controlId="formBasicEmail">
							    <Form.Label>Email address</Form.Label>
							    <Form.Control type="email" placeholder="Enter email" readOnly
							    value={email}/>
							  </Form.Group>	
							  <Form.Group className="mb-3" controlId="usernamefield">
							    <Form.Label>Username</Form.Label>
							    <Form.Control type="text" placeholder="Enter username" 
							    value={username}
							    onChange={(e)=>setUserData({...userdata,username:e.target.value})}/>
							  </Form.Group>	
							  <div>
							  	<p>
							  		<b>Plan Type:</b> <span className="badge rounded-pill bg-primary">{auth?.plan?.planType}</span>
							  	</p>
							  	<p>
							  		<b>Storage:</b> <span className="badge rounded-pill bg-primary">{auth?.plan?.storage}</span>
							  	</p>							  	
							  </div>
							  <Button onClick={updateDetails} variant="warning">Update Profile</Button>						  			
						</Col>
					</Row>
				</Container>
			</div>
		)
}

export default Profile;