import React from 'react';
import {Card} from 'react-bootstrap';

const AdminCard = ({title,data}) =>{
	return(
			<Card style={{ width: '18rem' }}>
			  <Card.Body>
			    <Card.Title>{title}</Card.Title>
			    <Card.Subtitle className="mb-2 text-muted">{data}</Card.Subtitle>
			  </Card.Body>
			</Card>
		)
}

export default AdminCard;