import React from 'react';
import {Link} from 'react-router-dom';
import {ListGroup,ProgressBar} from 'react-bootstrap';
import {useSelector,useDispatch} from 'react-redux';
import {formatBytes,storagePercentage} from '../../utils/file';
import {resetPath} from '../BreadCrumbNav/breadcrumbSlice';

const Wrapper = ({children,show}) =>{
	const dispatch = useDispatch();
	const {auth:{plan}} = useSelector(state=>state.auth);
	const percentageData = storagePercentage(plan && plan.totalInBytes,plan && plan.used) + '%';

	return(
		<div className="wrapper__container">
			<div className={`sidebar__wrapper ${show ? '' : 'd-none'}`}>
				<ListGroup as="ul">			
				  <ListGroup.Item as="li" active onClick={()=>dispatch(resetPath())}>
				    <Link to='/home'>Dashboard</Link>
				  </ListGroup.Item>
				  <ListGroup.Item as="li">
				  <Link to='/profile'>Profile</Link>
				  </ListGroup.Item>
				  <ListGroup.Item as="li">
				  	<Link to='/settings'>Manage Account</Link>
				  </ListGroup.Item>
				  <ListGroup.Item as="li">Plan ({plan && plan.planType})
				  <p>Used {plan && formatBytes(plan.used)} of {plan && plan.storage}</p>
				  <ProgressBar now={storagePercentage(plan && plan.totalInBytes,plan && plan.used)} label={percentageData}/>
				  </ListGroup.Item>
				</ListGroup>
			</div>
			<div className="wrapper__content">
				{children}
			</div>
		</div>	
		)
}

export default Wrapper;