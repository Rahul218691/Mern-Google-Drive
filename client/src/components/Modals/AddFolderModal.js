import React,{useState} from 'react';
import {Modal,Button,Form} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {useDispatch,useSelector} from 'react-redux';
import {createFolder} from '../../api/folderAPI';
import {loadingfolders,addNewFolder} from '../../components/Folder/folderSlice';

const AddFolderModal = ({show,handleClose,id}) =>{

	const dispatch = useDispatch();
	const {auth} = useSelector(state=>state.auth);

	const [foldername,setFolderName] = useState('');

	const createNewFolder = async() =>{
		if(!foldername) return toast.error('Folder Name is Required!');
		dispatch(loadingfolders());
		handleClose();		
		try {
			const newFolderCreate = await createFolder(foldername,id,auth.token);
			dispatch(addNewFolder(newFolderCreate));
			setFolderName('');
		} catch(error) {
			toast.error(error.response.data.msg);
		}
	}

	return(
	      <Modal
	        show={show}
	        onHide={handleClose}
	        backdrop="static"
	        keyboard={false}
	      >
	        <Modal.Header>
	          <Modal.Title>Add Folder</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
			  <Form.Group className="mb-3" controlId="formfolderName">
			    <Form.Label>Folder Name</Form.Label>
			    <Form.Control type="text" placeholder="Enter folder name" 
			    value={foldername}
			    autoComplete="off"
			    onChange={(e)=>setFolderName(e.target.value)}
			    />
			  </Form.Group>	          	
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleClose}>
	            Close
	          </Button>
	          <Button variant="primary" onClick={createNewFolder}>Create</Button>
	        </Modal.Footer>
	      </Modal>		
		)
}

export default AddFolderModal;