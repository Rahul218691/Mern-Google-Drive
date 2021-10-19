const User = require('../models/userModal');
const Orders = require('../models/orderModal');
const Razorpay = require('razorpay');
const crypto = require('crypto')
const Plan = require('../models/planModal');

const razorpay = new Razorpay({
	key_id:process.env.RAZORPAY_KEY_ID,
	key_secret:process.env.RAZORPAY_KEY_SECRET
});


const createOrder = async(req,res) =>{
	try{
		const {amount,plan} = req.body;
		const payment_capture = 1
		if(plan === "STANDARD" && amount !== 500) return res.status(400).json({msg:'Invalid Subscription!'});
		if(plan === "PREMIUM" && amount !==1000) return res.status(400).json({msg:'Invalid Subscription'});
		if(plan === "ENTERPRISE" && amount !==5000) return res.status(400).json({msg:'Invalid Subscription'});
		const reciptNum = `recipt_${Math. floor(100000 + Math. random() * 900000)}`;
			
		const options = {
			amount:amount * 100,
			currency:process.env.CURRENCY,
			receipt:reciptNum,
			payment_capture
		}

		const response = await razorpay.orders.create(options);

		const newOrder = await Orders.create({
			user:req.user._id,
			amount,
			receipt:reciptNum,
			order_id:response.id,
			planChosen:plan
		});

		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		});

	}catch(err){
		return res.status(500).json({msg:err.message});
	}
}


const verifyTransaction = async(req,res) =>{
	const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
	const shasum = crypto.createHmac('sha256', secret);
	shasum.update(JSON.stringify(req.body));
	const digest = shasum.digest('hex');
	if(digest === req.headers['x-razorpay-signature']){
		console.log('request is legit');
		const {payload:{payment:{entity}}} = req.body;
		const order = await Orders.findOne({order_id:entity.order_id});
		order.paymentMethod = entity.method;
		order.status = entity.captured;
		order.paymentId = entity.id;
		await order.save();
		const plan = await Plan.findOne({user:order.user});
		if(order.planChosen === "STANDARD"){
			plan.storage = "1GB";
			plan.totalInBytes = 1073741824;
			plan.remainingStorage = 1073741824 - plan.used;
			plan.planType = order.planChosen;
		}else if (order.planChosen === "PREMIUM") {
			plan.storage = "2GB";
			plan.totalInBytes = 2147483648;
			plan.remainingStorage = 2147483648 - plan.used;
			plan.planType = order.planChosen;			
		}else if(order.planChosen === "ENTERPRISE"){
			plan.storage = "1TB";
			plan.totalInBytes = 1099511627776;
			plan.remainingStorage = 1099511627776 - plan.used;
			plan.planType = order.planChosen;	
		}
		await plan.save();
	}else{
		console.log('request is not legit');
	}	
	res.json({status:'ok'});
}


module.exports = {
createOrder,
verifyTransaction
}