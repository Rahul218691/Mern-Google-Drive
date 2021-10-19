import React,{useEffect,useState} from 'react';
import AdminCard from './AdminCard';
import {getInfo} from '../../api/adminAPI';
import {plans} from '../../utils/plans';
import {useSelector} from 'react-redux';

const DetailsListing = () =>{

	const {auth} = useSelector(state=>state.auth);
	const [user,setUser] = useState(0);
	const [income,setIncome] = useState(0);

	useEffect(() =>{
		const getAppInfo = async() =>{
			const infoapp = await getInfo(auth.token);
			setUser(infoapp.users);
			setIncome(infoapp.revenue)
		}
		getAppInfo()
	},[auth.token]);

	return(
			<div className="list__cards">
				<AdminCard 
				title="Users"
				data={`Total users: ${user}`}
				/>
				<AdminCard 
				title="Plans"
				data={`Total Plans: ${plans.length}`}
				/>
				<AdminCard 
				title="Revenue"
				data={income}
				type="revenue"
				/>					
			</div>
		)
}


export default DetailsListing;