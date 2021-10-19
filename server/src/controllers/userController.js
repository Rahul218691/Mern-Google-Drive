const User = require('../models/userModal');
const fs = require('fs');
const path = require('path');
const Plan = require('../models/planModal');
const File = require('../models/fileModal');
const Folder = require('../models/folderModal');
const Orders = require('../models/orderModal');

const {	hashPassword,comparePassword} = require('../helpers/bcrypt.helper');


const updateProfile = async(req,res) =>{
	try {
		const user = await User.findById(req.user._id);
		if(!user) return res.status(400).json({msg:'User not found'});
		const {username} = req.body;
		if(!req.file){
			user.username = username ? username : user.username;
			const updated =  await user.save();
			res.json({
				msg:'Update Success!',
				user:{
					...updated._doc,
					password:''
				}
			});
		}else{
			 	const pathdata = path.join(__dirname,'../../uploads/profile');
			 	if(!user.profile.includes('rahulcloudstorage')){
			 		const oldfilename = user.profile.split('profile/')[1];
				 	fs.unlink(`${pathdata}/${oldfilename}`,(err)=>{
				 		if(err) console.log(err);
				 	});
			 	}
			 	const profurl = `${process.env.BASE_URL}/profile/${req.file.filename}`;
			 	user.username = username ? username : user.username;
			 	user.profile = profurl;
			 	const updated = await user.save();
			 	res.json({
			 		msg:'Update Success!',
			 		user:{
			 			...updated._doc,
			 			password:''
			 		}
			 	})
		}
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}


const deleteAccount = async(req,res) =>{
	try {
		const user = await User.findById(req.user._id);
		if(!user) return res.status(400).json({msg:'User not found'});
		const myfiles = await File.find({user:req.user._id});
		myfiles.map((data) =>{
			let spliturl = data.fileurl.split('files/')[1];
			let pathinfo = path.join(__dirname,`../../uploads/files/${spliturl}`);
			fs.unlink(pathinfo,(err)=>{
				if(err) console.log(err);
			});
		});	
		if(!user.profile.includes('rahulcloudstorage')){
			const oldfilename = user.profile.split('profile/')[1];
			const pathprofiledata = path.join(__dirname,`../../uploads/profile/${pathprofiledata}`);
			fs.unlink(pathprofiledata,(err)=>{
				if(err) console.log(err);
			})
		}	
		await Plan.deleteOne({user:req.user._id});
		await File.deleteMany({user:req.user._id});
		await Folder.deleteMany({user:req.user._id});
		await User.deleteOne({_id:req.user._id});
		res.json({msg:'Account deleted successfully!'});	
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}


const updatePassword = async(req,res) =>{
	try {
		const {oldpass,newpass,confirmpass} = req.body;
		const user = await User.findById(req.user._id);
		if(!user) return res.status(400).json({msg:'User not found!'});
		if(newpass !== confirmpass) return res.status(400).json({msg:'Confirm password does not match!'});
		const isMatch = await comparePassword(oldpass,user.password);
		if(!isMatch) return res.status(400).json({msg:'Current Password Entered is Incorrect!'});
		const hashData = await hashPassword(newpass);
		user.password = hashData;
		await user.save();
		res.json({
			msg:'Password Updated successfully!'
		});
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}


const getMyPayments = async(req,res) =>{
	try{
		const orders = await Orders.find({user:req.user._id});
		res.json(orders);
	}catch(err){
		return res.status(500).json({msg:err.message});
	}
}


module.exports = {
	updateProfile,
	deleteAccount,
	updatePassword,
	getMyPayments,
	getMyPayments
}