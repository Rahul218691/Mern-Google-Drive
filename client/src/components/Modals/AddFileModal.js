import React,{useState} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {useDispatch,useSelector} from 'react-redux';
import {loadingfiles,addNewFile,endLoading} from '../File/fileSlice';
import {addFiles} from '../../api/fileAPI';
import {authSuccess} from '../../pages/auth/authSlice';
import {addSubFile} from '../Folder/folderSlice';

const AddFileModal = ({showfile,handleCloseFile,id}) =>{

	const dispatch = useDispatch();
	const {auth} = useSelector(state=>state.auth);

	const [file,setFile] = useState('');

	const createNewFile = async() =>{
		if(!file) return toast.error('No Files Selected!');
		if(id === undefined){
			id = ''
		}
		let formdata = new FormData();
		formdata.append('file',file);
		formdata.append('id',id);
		dispatch(loadingfiles());
		handleCloseFile();
		try {
			const newFileCreated = await addFiles(formdata,auth.token);
			if(!id){
				dispatch(addNewFile(newFileCreated));
			}else{
				dispatch(addSubFile(newFileCreated));
			}
			let authData = {
				...auth,
				plan:newFileCreated.updated
			}
			dispatch(authSuccess(authData));
			setFile('');
			dispatch(endLoading());
		} catch(error) {
			toast.error(error.response.data.msg);
		}
	}

	return(
	      <Modal
	        show={showfile}
	        onHide={handleCloseFile}
	        backdrop="static"
	        keyboard={false}
	      >
	        <Modal.Header>
	          <Modal.Title>Add File</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
			  <Form.Group controlId="formFile" className="mb-3">
			    <Form.Label>Choose a File To Upload</Form.Label>
			    <Form.Control type="file" onChange={(e)=>setFile(e.target.files[0])}/>
			  </Form.Group>          	
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleCloseFile}>
	            Close
	          </Button>
	          <Button variant="primary" onClick={createNewFile}>Upload</Button>
	        </Modal.Footer>
	      </Modal>		
		)
}

export default AddFileModal;