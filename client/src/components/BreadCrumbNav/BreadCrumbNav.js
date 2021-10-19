import React from 'react';
import {Breadcrumb} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import {useSelector,useDispatch} from 'react-redux';
import {resetPath} from './breadcrumbSlice';

const BreadCrumbNav = ({show,setShow,id}) =>{
	const {path} = useSelector(state=>state.path);
	const dispatch = useDispatch();

	return(
		<div className="breadcrum__header">
			<Breadcrumb>
			  <button onClick={()=>setShow(!show)} className="btn"><FaBars /></button>
			  <Link className="breadcrumb-item" to='/home' onClick={()=>dispatch(resetPath())}>Home</Link>
			  {
			  	path && path.map((p,i) =>(
			  		<Link className={`breadcrumb-item ${id === p._id ? 'active': ''}`} key={i} to={`/folder/${p._id}`}>{p?.foldername}</Link>
			  		))
			  }
			</Breadcrumb>
		</div>
		)
}

export default BreadCrumbNav;