import React from 'react';
import {Button} from 'react-bootstrap';
import { FaAngleDoubleLeft,FaAngleDoubleRight } from "react-icons/fa";

const PaginationComp = ({page,setPage,hasNext,hasPrevious}) =>{
	return(
			<div className="paginate__btn">
				<Button disabled={hasPrevious ? false : true} onClick={()=>setPage(page - 1)}><FaAngleDoubleLeft /></Button>
				<Button disabled={hasNext ? false : true} onClick={()=>setPage(page + 1)}><FaAngleDoubleRight /></Button>
			</div>
		)
}

export default PaginationComp;