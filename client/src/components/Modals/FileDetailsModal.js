import React,{useState} from 'react';
import {Modal,Button,InputGroup,FormControl,Spinner} from 'react-bootstrap';
import moment from 'moment';
import {formatBytes} from '../../utils/file';
import { FaCloudDownloadAlt,FaTrash,FaRegShareSquare,FaRegCopy,FaMailBulk } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import {toast} from 'react-toastify';
import {useDispatch,useSelector} from 'react-redux';
import {removeFile} from '../File/fileSlice';
import {removesubFile} from '../Folder/folderSlice';
import {deleteFile,sharefileAsEmail} from '../../api/fileAPI';
import {authSuccess} from '../../pages/auth/authSlice';

const FileDetailsModal = ({detailshow,handleDetailClose,data}) =>{

	// const docarr = ['bmp','doc','docx','htm','html','jpg','jpeg','pdf','png','ppt','pptx','tiff','txt','xls','xlsx'];	
	const videoArr = ['mp4','ogg','webm'];
	const audioArr = ['mp3','wav','mpeg'];
	const imgArr = ['jpg','jpeg','png'];
	const ext = data?.fileurl?.substr(data.fileurl.lastIndexOf('.') + 1);
	const [showmail,setShowmail] = useState(false);
	const [email,setEmail] = useState('');
	const dispatch = useDispatch();
	const {auth} = useSelector(state=>state.auth);
	const [load,setLoad] = useState(false);

	const handleClipBoard = async(url) =>{
		handleDetailClose();
		await navigator.clipboard.writeText(url);
		toast.success('Copied to Clipboard');
	}

	const sendMail = async(size,url) =>{
		if(auth.plan.planType === "Free"){
			return toast.error('Please Upgrade your plan to share files via email');
		}
		if(size > 26214400){
			setEmail('');
			return toast.error('File size more than 25 MB cannot be shared through email');
		}
		if(!url) return;
		try{
			const sendEmail = await sharefileAsEmail(email,url,auth.token);
			toast.success(sendEmail.msg);
			setEmail('');
			setShowmail(false);
			handleDetailClose();
		}catch(error){
			toast.error(error.response.data.msg);
		}
	}

	const handleRemoveFile = async(id,type) =>{
		setLoad(true);
		try {
			const deleted = await deleteFile(id,auth.token);
			const authData = {
				...auth,
				plan:deleted.updated
			}
			dispatch(authSuccess(authData));
			setLoad(false)
			handleDetailClose();
			if(type){
				dispatch(removeFile(id));
			}else{
				dispatch(removesubFile(id));
			}
		} catch(error) {
			setLoad(false)
			toast.error(error.response.data.msg);
		}				
	}

	const handleDownload = (url) =>{
		const filenameURL = url.split('files/')[1];
		fetch(url, {
		    method: 'GET'
		  })
		  .then((response) => response.blob())
		  .then((blob) => {
		    const url = window.URL.createObjectURL(
		      new Blob([blob]),
		    );
		    const link = document.createElement('a');
		    link.href = url;
		    link.setAttribute(
		      'download',
		      `${filenameURL}`,
		    );
		    document.body.appendChild(link);
		    link.click();
		    link.parentNode.removeChild(link);
		    window.URL.revokeObjectURL(url);
		    handleDetailClose();
		  });		
	}

	return(
	      <Modal
	        show={detailshow}
	        onHide={handleDetailClose}
	        backdrop="static"
	        keyboard={false}
	      >
	        <Modal.Header>
	          <Modal.Title>{data?.fileurl?.split('files/')[1]}</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	          <div className="text-center">
	          	<p><b>Uploaded On:</b> {moment(data.createdAt).format('dddd, MMMM Do YYYY')}</p>
	          	<p><b>File Size:</b> {formatBytes(data?.fileSize)}</p>
	          	<div className="display__container">
	          		{
						videoArr.includes(ext) ?
	          			<video controls src={data.fileurl} className="video__container"/>
	          			: audioArr.includes(ext) ?
	          			<audio controls src={data.fileurl}/>
	          			:imgArr.includes(ext) ?
	          			<img src={data.fileurl} className="img-fluid imagemodal__container" alt=""/>
	          			:null
	          		}
	          	</div>
	          	<div className="mt-1 d-flex justify-content-evenly">
	          		<button className="btn btn-success" onClick={()=>handleDownload(data?.fileurl)}><FaCloudDownloadAlt /></button>
	          		{
	          			load ? <Spinner animation="grow"/>
	          			:<button className="btn btn-danger" onClick={()=>handleRemoveFile(data?._id,data?.parent)}><FaTrash /></button>
	          		}
	          	</div>
	          	<div className="mt-1">
	          		<p><b>Share <FaRegShareSquare /></b></p>
	          		<div className="d-flex justify-content-evenly">
	          		<button className="btn btn-info" onClick={()=>handleClipBoard(data?.fileurl)}>Copy URL <FaRegCopy /></button>
	          		<button className="btn btn-info" onClick={()=>setShowmail(!showmail)}>Email <FaMailBulk /></button>
	          		</div>
	          		{
	          			showmail && 
						  <InputGroup className="mb-3 mt-2">
						    <FormControl
						      placeholder="Receiver Email"
						      value={email}
						      onChange={(e)=>setEmail(e.target.value)}
						    />
						    <Button variant="outline-secondary" id="button-addon2" onClick={()=>sendMail(data?.fileSize,data?.fileurl)}>
						      <AiOutlineSend />
						    </Button>
						  </InputGroup>	          			
	          		}
	          	</div>
	          </div>
	        </Modal.Body>
	        <Modal.Footer>
	          <Button variant="secondary" onClick={handleDetailClose}>
	            Close
	          </Button>
	        </Modal.Footer>
	      </Modal>
		)
}

export default FileDetailsModal;