const Users = require('../models/userModal');
const Orders = require('../models/orderModal');


const getApplicationInfo = async(req,res) =>{
	try {
		const users = await Users.countDocuments({role:'user'});
		const orders = await Orders.find();
		const Totalrevenue = orders.reduce((acc, pilot) => acc + pilot.amount, 0);
		res.json({
			users,
			revenue:Totalrevenue
		});
	} catch(err) {
		return res.status(500).json({msg:err.message});	
	}
}

const transactions = async(req,res) =>{
	try {

	    const page = req.query.page ? parseInt(req.query.page) : 1
	    const limit = req.query.limit ? parseInt(req.query.limit) : 10

	    const startIndex = (page - 1) * limit
	    const endIndex = page * limit

	    const results = {}	
	    
	    if (endIndex < await Orders.countDocuments().exec()) {
	      results.next = {
	        page: page + 1,
	        limit: limit
	      }
	    }
	    
	    if (startIndex > 0) {
	      results.previous = {
	        page: page - 1,
	        limit: limit
	      }
	    }	  

		results.results = await Orders.find().limit(limit).skip(startIndex)
		.sort('-createdAt')
		.populate("user","username email")
		.exec()
      	
		res.json(results);

	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

const getRevenue = async(req,res) =>{
	try{
		const {period} = req.query;
		const today = new Date();
		let year = today.getFullYear();
		let month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
		let date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
		if(period === "month"){
			let fromdate = `${year}-${month}-01`;
			let lastdate = `${year}-${month}-${daysInMonth(month,year)}`;
			const data = await Orders.find({createdAt:{$gte:new Date(fromdate),$lt:new Date(lastdate)}})
			.select('planChosen amount');
			let revdata = calculateRevenue(data);
			res.json(revdata);
		}else if (period === "today") {
			let curdate = `${year}-${month}-${date}`;
			const data = await Orders.find({createdAt:new Date(curdate)}).select('planChosen amount');
			let revdata = calculateRevenue(data);
			res.json(revdata);
		}else if (period === "year") {
			let yearstart = `${year}-01-01`;
			let yearend = `${year}-12-${daysInMonth(12,year)}`;
			const data = await Orders.find({createdAt:{$gte:new Date(yearstart),$lt:new Date(yearend)}})
			.select('planChosen amount');
			let revdata = calculateRevenue(data);
			res.json(revdata);
		}
	}catch(err){
		return res.status(500).json({msg:err.message});
	}
}


function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}


function calculateRevenue(data) {
	let revenue=[];

	const standardRevenue = data.filter(rev=>rev.planChosen === "STANDARD")
	.map(info=> info.amount)
	.reduce((acc,amount) => acc + amount,0);

	let obj1 = {
		label:'STANDARD',
		value:standardRevenue
	}
	revenue.push(obj1);

	const premiumRevenue = data.filter(rev=>rev.planChosen === "PREMIUM")
	.map(info=> info.amount)
	.reduce((acc,amount) => acc + amount,0);

	let obj2 = {
		label:'PREMIUM',
		value:premiumRevenue
	}
	revenue.push(obj2);

	const enterpriseRevenue = data.filter(rev=>rev.planChosen === "ENTERPRISE")
	.map(info=> info.amount)
	.reduce((acc,amount) => acc + amount,0);

	let obj3 = {
		label:'STANDARD',
		value:enterpriseRevenue
	}
	revenue.push(obj3);
	return revenue;
}

module.exports = {
	getApplicationInfo,
	transactions,
	getRevenue
}