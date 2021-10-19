import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../images/google-drive.svg';
import {Dropdown} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {logout} from '../../api/authAPI';


const Header = () =>{

	const {auth} = useSelector(state=>state.auth);

	const handlelogout = async() =>{
		try{
			await logout();
		}catch(error){
			console.log(error.message);
		}
	}

	return(
		<nav className="navbar fixed-top navbar-light bg-light">
		  <div className="container-fluid">
		    <Link className="navbar-brand" to="/home">
		      <img src={Logo} alt="" width="30" height="24" className="d-inline-block align-text-top" />
		      	{" "}G-Drive
		    </Link>
			{
				auth && auth.user && (
						<Dropdown>
						  <Dropdown.Toggle id="dropdown-basic" as="span">
						    <img src={auth?.user?.profile}
						    alt="" className="img-fluid userAvatar"/>
						  </Dropdown.Toggle>

						  <Dropdown.Menu>
						    <Link className="dropdown-item" to='#' onClick={handlelogout}>Logout</Link>
						  </Dropdown.Menu>
						</Dropdown>	 
				)
			}   
		  </div>
		</nav>
		)
}

export default Header;