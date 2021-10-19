const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
	username:{
		type:String,
		maxLength:20,
		trim:true,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique:true,
		trim:true
	},
	password:{
		type:String,
		minLength:6,
		required:true,
		trim:true
	},
	verification:{
		type:String,
		default:""
	},
	grant:{
		type:Boolean,
		default:false
	},
	profile:{
		type:String,
		default:'https://res.cloudinary.com/rahulcloudstorage/image/upload/v1591775417/images_lg4hyi.png'
	},
	role:{
		type:String,
		default:'user'
	}
},{
	timestamps:true
})

module.exports = mongoose.model('user',userSchema);