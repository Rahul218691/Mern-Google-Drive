import React,{useState,useEffect} from 'react';
import {Card} from 'react-bootstrap';
import {Graph} from '../index';
import {getGraphRevenue} from '../../api/adminAPI';
import {useSelector,useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import {loadingdata,setGraphData} from './adminSlice';

const GraphComponent = () =>{

	const dispatch = useDispatch();
	const {graph} = useSelector(state=>state.admin);
	const {auth} = useSelector(state=>state.auth);
	const [selected,setSelected] = useState('today');

	useEffect(()=>{
		const getGraphicalRevenue = async() =>{
			try{
				dispatch(loadingdata());
				const data = await getGraphRevenue(selected,auth.token);
				dispatch(setGraphData(data));
			}catch(err){
				toast.error(err.response.data.msg);
			}
		}
		getGraphicalRevenue()
	},[auth.token,dispatch,selected]);

	return(
			<div className="income__graph">
			<Card>
			  <Card.Body>
			    <Card.Title>Income</Card.Title>
			    <Card.Subtitle className="mb-2 text-muted">
					<div className="form-check">
					  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" 
					  checked={selected === 'today' ? true : false}
					  onChange={(e)=>setSelected('today')}/>
					  <label className="form-check-label" htmlFor="flexRadioDefault1">
					    Today
					  </label>
					</div>
					<div className="form-check">
					  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" 
					  checked={selected === 'month' ? true : false}
					  onChange={()=>setSelected('month')}/>
					  <label className="form-check-label" htmlFor="flexRadioDefault2">
					    This Month
					  </label>
					</div>	
					<div className="form-check">
					  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" 
					  checked={selected === "year" ? true : false}
					  onChange={()=>setSelected('year')}/>
					  <label className="form-check-label" htmlFor="flexRadioDefault3">
					    This Year
					  </label>
					</div>										  					  		    
			    </Card.Subtitle>
			    <Card.Text as="div">
			     	<Graph data={graph}/>
			    </Card.Text>
			  </Card.Body>
			</Card>				
			</div>
		)
}

export default GraphComponent;