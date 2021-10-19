const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;


const orderSchema = new mongoose.Schema({
	user:{
		type:ObjectId,
		ref:'user',
		required:true
	},
	amount:{
		type:Number,
		required:true,
		required:true
	},
	currency:{
		type:String,
		default:'INR'
	},
	receipt:{
		type:String
	},
	order_id:{
		type:String,
		required:true
	},
	paymentMethod:{
		type:String
	},
	planChosen:{
		type:String,
		required:true,
		trim:true
	},
	status:{
		type:Boolean,
		default:false
	},
	paymentId:{
		type:String
	}
},{
	timestamps:true
});

module.exports = mongoose.model('order',orderSchema);