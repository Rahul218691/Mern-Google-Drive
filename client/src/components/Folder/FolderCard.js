import React,{useState,useEffect} from 'react';
import {Card,Dropdown} from 'react-bootstrap';
import {FaFolder} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {addPath} from '../BreadCrumbNav/breadcrumbSlice';
import { GoKebabVertical } from "react-icons/go";
import {deleteFolder} from '../../api/folderAPI';
import {toast} from 'react-toastify';
import {Loading} from '../index';
import {removeFolder} from './folderSlice';
import {authSuccess} from '../../pages/auth/authSlice';

const FolderCard = ({data}) =>{

	const [loading,setLoading] = useState(false);
	const [delid,setDelid] = useState('');
	const dispatch = useDispatch();
	const {auth} = useSelector(state=>state.auth);

	const handleFolderDelete = async(id) =>{
		try {
			setLoading(true);
			const deleteData = await deleteFolder(id,auth.token);
			toast.success(deleteData.msg);
			setDelid(id)
			const authData = {
				...auth,
				plan:deleteData.plan ? deleteData.plan : auth.plan
			}				
			 dispatch(authSuccess(authData));
			setLoading(false);
		} catch(error) {
			toast.error(error.response.data.msg);
			setLoading(false)
		}
	}

	useEffect(() =>{
		if(delid){
			dispatch(removeFolder(delid));
		}
		return ()=> setDelid('');
	},[delid,dispatch])

	return(
		<>
		{loading && <Loading />}
		<Card body>
			<Link to={`/folder/${data._id}`} onClick={()=>dispatch(addPath(data))} className="folderlinks">
			<FaFolder /> <span>{data.foldername}</span>
			</Link>
			<Dropdown as="span">
				<Dropdown.Toggle as="span">
					<GoKebabVertical />
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item tag={Link} to='#' onClick={()=>handleFolderDelete(data._id)}>Delete</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>			
		</Card>
		</>
		)
}

export default FolderCard;