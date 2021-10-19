const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const folderSchema = new mongoose.Schema({
	foldername:{
		type:String,
		required:true,
		trim:true
	},
	user:{
		type:ObjectId,
		ref:'user',
		required:true
	},
	parent:{
		type:Boolean,
		default:true
	},
	parentid:{
		type:String
	}
},{
	timestamps:true
});

module.exports = mongoose.model('folder',folderSchema);