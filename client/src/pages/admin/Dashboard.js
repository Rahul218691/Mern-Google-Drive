import React from 'react';
import {AppDetails,GraphComponent,TransactionTable} from '../../components';
import {Row,Col} from 'react-bootstrap';

const AdminDashboard = () =>{
	return(
			<div className="admin__dashboard__main">
				<div className="admin__card__listing">
					<AppDetails />
				</div>
				<Row>
					<Col md={4}>
						<GraphComponent />
					</Col>
					<Col md={8}>
						<TransactionTable />
					</Col>
				</Row>
			</div>
		)
}

export default AdminDashboard;
