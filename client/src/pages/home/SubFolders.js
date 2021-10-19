import React,{useState,useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {Wrapper,BreadCrumb,ActionBar,Loading,Folder,File} from '../../components';
import {useParams} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {loadingfolders,getFolders,getFiles} from '../../components/Folder/folderSlice';
import {getFolderById} from '../../api/folderAPI';
import {toast} from 'react-toastify';

const SubFolders = () =>{

	const dispatch = useDispatch();
	const {auth:{auth},folders:{isLoading,folder,subfiles},files:{isLoading:load}} = useSelector(state=>state);
	const [show,setShow] = useState(true);
	const {id} = useParams();

	useEffect(() =>{
		const getSubFolders = async() =>{
			dispatch(loadingfolders());
			try {
				const getFolderData = await getFolderById(id,auth.token);
				dispatch(getFolders(getFolderData));
				dispatch(getFiles(getFolderData));
			} catch(error) {
				toast.error(error.response.data.msg);
			}
		}
		getSubFolders();
	},[id,auth.token,dispatch]);

	return(
			<Container fluid>
				<Wrapper show={show}>
					{isLoading  ? <Loading /> : null}
					{load ? <Loading /> : null}
					<BreadCrumb show={show} setShow={setShow} id={id}/>
					<ActionBar id={id}/>
					{
						folder && folder.length > 0 && (
								<div className="home__folders">
									<h5>Folders</h5>
									<div className="folder__container">
										{
											folder && folder.map((fold,i) =>(
												<Folder key={i} data={fold}/>
											))
										}
									</div>
								</div>
							)
					}
					{
						subfiles && subfiles.length > 0 && (
							<div className="home__files">
								<h5>Files</h5>
								<div className="file__container">
									{
										subfiles && subfiles.map((file,i) =>(
											<File key={i} data={file}/>
										))
									}
								</div>
							</div>	
						)
					}								
				</Wrapper>
			</Container>
		)
}

export default SubFolders;