import React,{useState,useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {Wrapper,Folder,File,BreadCrumb} from '../../components';
import {getHomeFolders} from '../../api/folderAPI';
import {getHomeFiles} from '../../api/fileAPI';
import {Loading,ActionBar} from '../../components';
import {loadingfolders,getFolders} from '../../components/Folder/folderSlice';
import {useDispatch,useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {loadingfiles,getFiles} from '../../components/File/fileSlice';

const Home = () =>{
	const dispatch = useDispatch();
	const {folders:{isLoading,folder},auth:{auth},files:{isLoading:load,files}} = useSelector(state=>state);
	const [show,setShow] = useState(true);

	useEffect(()=>{
		const getMainFolders = async() =>{
			dispatch(loadingfolders());
			try {
				const getMyFolders = await getHomeFolders(auth.token);
				dispatch(getFolders(getMyFolders));
			} catch(error) {
				toast.error(error.response.data.msg);
			}
		}
		const getMainFiles = async() =>{
			dispatch(loadingfiles());
			try{
				const getMyFiles = await getHomeFiles(auth.token);
				dispatch(getFiles(getMyFiles));
			}catch(error){
				toast.error(error.response.data.msg);
			}
		}
		getMainFolders();
		getMainFiles();
	},[dispatch,auth.token]);

	return(
			<Container fluid>
				<Wrapper show={show}>
					{isLoading  ? <Loading /> : null}
					{load ? <Loading /> : null }
					<BreadCrumb show={show} setShow={setShow}/>
					<ActionBar />
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
						files && files.length > 0 && (
							<div className="home__files">
								<h5>Files</h5>
								<div className="file__container">
									{
										files && files.map((file,i) =>(
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


export default Home;