import React from 'react';
import {Row,Col,ListGroup,Button} from 'react-bootstrap';
import { TiTick,TiTimes } from "react-icons/ti";
import {plans} from '../../utils/plans';
// import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {makeOrder} from '../../api/paymentAPI';
import Logo from '../../images/google-drive.svg';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}


const __DEV__ = document.domain === 'localhost';


const UpgradePlan = () =>{

	const {auth} = useSelector(state=>state.auth);

	const displayRazorPay = async(amount,plan) =>{
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
		if(!res) return toast.error('Razorpay SDK failed to load Are you online?');
		const data = await makeOrder(amount,plan,auth.token);
		const options = {
			key:__DEV__ ? process.env.REACT_APP_RAZORPAY_KEY_ID : process.env.REACT_APP_RAZORPAY_KEY_ID_PROD,
			currency:data.currency,
			amount:data.amount.toString(),
			order_id:data.id,
			name:'G-Drive',
			description:'Plan Upgrade for G-Drive',
			image:{Logo},
			handler:function(response){
				if(response){
					window.location.reload()
				}
			},
			prefill:{
				name:auth.user.username,
				email:auth.user.email
			}
		}
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	} 

	return(
			<div className="plans__list"> 
				<Row>
					{
						plans && plans.map(data =>(
								<Col md={4} key={data.planid}>
									<div className="plan__div mb-2">
										<ListGroup>
										  <ListGroup.Item>
										  	<h5>{data.plantype}</h5>
										  	<h5>&#8377; {data.price}</h5>
											  </ListGroup.Item>
											  <ListGroup.Item variant="secondary"><TiTick /> Storage: {data.storage}</ListGroup.Item>
											  <ListGroup.Item variant="success">{data.share_files ? <TiTick /> : <TiTimes /> } Share Files</ListGroup.Item>
											  <ListGroup.Item variant="danger">{data.support ? <TiTick /> : <TiTimes /> } Support</ListGroup.Item>
											  <ListGroup.Item variant="warning">Period: {data.period ? data.period : 'fixed storage'}</ListGroup.Item>
											  <ListGroup.Item>
											  		<Button onClick={()=>displayRazorPay(data.price,data.plantype)} disabled={data.plantype === "FREE" ? true : false}>Choose Plan</Button>
											  </ListGroup.Item>
										</ListGroup>
									</div>
								</Col>
							))
					}
				</Row>
			</div>
		)
}

export default UpgradePlan;