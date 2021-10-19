import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import {ChangePassword,PlanUpgrade,AccountSetting,Payments} from '../../components';


const Settings = () =>{

	const [current,setCurrent] = useState('password');

	return(
			<>
				<Link to='/home' className="btn btn-secondary">Go Home</Link>
				<Container>
					<div className="text-center pillsbtn">
						<button onClick={()=>setCurrent('password')} className={`btn ${current === 'password' ? 'btn-primary' : ''}`}>Change Password</button>
						<button onClick={()=>setCurrent('plan')} className={`btn ${current === 'plan' ? 'btn-primary' : ''}`}>Upgrade Plan</button>
						<button onClick={()=>setCurrent('payments')} className={`btn ${current === 'payments' ? 'btn-primary' : ''}`}>Payments</button>
						<button onClick={()=>setCurrent('account')} className={`btn ${current === 'account' ? 'btn-primary' : ''}`}>Account Action</button>
					</div>
					<div className="components__body mt-2">
						{
							current === "password" ?
							<ChangePassword />
							: current === "plan" ?
							<PlanUpgrade />
							: current === "account" ?
							<AccountSetting />
							: current === "payments" ?
							<Payments /> :null
						}
					</div>
				</Container>
			</>
		)
}

export default Settings;