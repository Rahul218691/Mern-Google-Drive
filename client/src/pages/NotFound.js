import React from 'react';
import Img from '../images/404.svg';
import {Link} from 'react-router-dom';

const NotFound = () =>{
	return(
			<div className="text-center">
				<img src={Img} alt="" className="img-fluid" />
				<Link to='/home' className="btn btn-primary mb-2 mt-2">Home</Link>
			</div>
		)
}

export default NotFound;