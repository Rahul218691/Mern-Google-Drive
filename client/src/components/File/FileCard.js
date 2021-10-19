import React,{useState} from 'react';
import {Card} from 'react-bootstrap';
import {FaFileAlt} from 'react-icons/fa';
import {DetailsModal} from '../index';

const FileCard = ({data}) =>{

	const [detailshow,setDetailShow] = useState(false);

	const handleDetailClose = () => setDetailShow(false);
	const handleDetailOpen = () =>setDetailShow(true);

	return(
		<>
		<Card body onClick={handleDetailOpen}>
			<FaFileAlt /> <span>{data?.fileurl?.split('files/')[1]}</span>
		</Card>
		<DetailsModal detailshow={detailshow} handleDetailClose={handleDetailClose} data={data}/>
		</>
		)
}

export default FileCard;