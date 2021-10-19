import React,{useEffect,useState} from 'react';
import {Table} from 'react-bootstrap';
import {myTransactions} from '../../api/userAPI';
import {useSelector} from 'react-redux';
import { TiTick,TiTimes } from "react-icons/ti";

const Payments = () =>{

	const {auth} = useSelector(state=>state.auth);
	const [payments,setPayments] = useState([]);

	useEffect(() =>{

		const getData = async() =>{
			const payouts = await myTransactions(auth.token);
			setPayments(payouts);
		}

		getData();

	},[auth.token])

	return(
		<Table striped bordered hover responsive="md" style={{textAlign:'center'}}>
		  <thead>
		    <tr>
		      <th>OrderId</th>
		      <th>PlanChosen</th>
		      <th>Amount</th>
		      <th>Status</th>
		    </tr>
		  </thead>
		  <tbody>
		    {
		    	payments && payments.map(pay =>(
		    			<tr key={pay._id}>
		    				<td>{pay.order_id}</td>
		    				<td>{pay.planChosen}</td>
		    				<td>&#8377; {pay.amount}</td>
		    				<td>{pay.status ? <TiTick className="successCheck"/> : <TiTimes className="failureCheck"/>}</td>
		    			</tr>
		    		))
		    }
		  </tbody>
		</Table>
		)
}

export default Payments;