import React,{useEffect,useState} from 'react';
import {Table,Form} from 'react-bootstrap';
import PaginationComp from './Pagination';
import {getTranscatDetails} from '../../api/adminAPI';
import {useSelector,useDispatch} from 'react-redux';
import {loadingdata,getpayments} from './adminSlice';
import {toast} from 'react-toastify';

const TransactionTable = () =>{

	const [page,setPage] = useState(1);

	const dispatch = useDispatch();

	const {auth} = useSelector(state=>state.auth);
	const {payments,hasNext,hasPrevious} = useSelector(state=>state.admin);

	useEffect(()=>{
		const getPaymentsInfo = async() =>{
			try {
				dispatch(loadingdata());
				const data = await getTranscatDetails(page,auth.token);
				dispatch(getpayments(data));
			} catch(err) {
				toast.error(err.response.data.msg);
			}
		}
		getPaymentsInfo();
	},[auth.token,page,dispatch])

	return(
		<div className="transact__table">
			<h5 className="text-center">Transactions</h5>
				<div className="search__filter">
					  <Form.Group className="mb-2" controlId="formBasicEmail">
					    <Form.Control type="text" placeholder="Search..." 
					    autoComplete="off"/>
					  </Form.Group>
				</div>
				<Table responsive="md">
				  <thead>
				    <tr>
				      <th>OrderId</th>
				      <th>PaymentId</th>
				      <th>Username</th>
				      <th>PlanChosen</th>
				      <th>PaymentMethod</th>
				      <th>Amount</th>
				      <th>Status</th>
				    </tr>
				  </thead>
				  <tbody>
				   {
				   	payments && payments.map(paydata =>(
				   		<tr key={paydata._id}>
				   			<td>{paydata.order_id}</td>
				   			<td>{paydata.paymentId}</td>
				   			<td>{paydata?.user?.username}</td>
				   			<td>{paydata.planChosen}</td>
				   			<td>{paydata.paymentMethod}</td>
				   			<td>&#8377; {paydata.amount}</td>
				   			<td>{paydata.status ? 'success': 'fail'}</td>
				   		</tr>
				   		))
				   }				    				    				    
				  </tbody>
				</Table>
				<PaginationComp setPage={setPage} hasNext={hasNext} hasPrevious={hasPrevious} page={page}/>
		</div>
		)
}

export default TransactionTable;