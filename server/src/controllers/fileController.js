const File = require('../models/fileModal');
const Folder = require('../models/folderModal');
const Plan = require('../models/planModal');
const path = require('path');
const fs = require('fs');
const {emailProcessor} = require('../helpers/email.helper');
const User = require('../models/userModal');

const myFiles = async(req,res) =>{
	try {
		const files = await File.find({user:req.user._id,parent:true}).sort('-createdAt');
		res.json({files});
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
} 

const addFiles = async(req,res) =>{
	try {
		if(!req.file) return res.status(400).json({msg:'No Files selected'});
		const {id} = req.body;
		const fileURL = `${process.env.BASE_URL}/files/${req.file.filename}`;
		const newFile = await File.create({
			user:req.user._id,
			fileurl:fileURL,
			fileSize:req.file.size,
			parent:id ? false : true,
			folderid:id
		});
		const plan = await Plan.findOne({user:req.user._id});
		if(!plan) return res.status(400).json({msg:'No Active Plans Found'});
	    plan.used = plan.used + req.file.size;
	    plan.remainingStorage = plan.remainingStorage - req.file.size;
	    let updated = await plan.save();
		res.json({newFile,updated});
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

const removeFile = async(req,res) =>{
	try {
		const {id} = req.params;
		const exists = await File.findById(id);
		if(!exists) return res.status(400).json({msg:'File Not Found!'});
		const plan = await Plan.findOne({user:req.user._id});
		if(!plan) return res.status(400).json({msg:'Failed to fetch active plan'});
		const filename = exists.fileurl.split('files/')[1];
		const pathinfo = path.join(__dirname,`../../uploads/files/${filename}`);
		if(fs.existsSync(pathinfo)){
			fs.unlink(pathinfo,(err)=>{
				if(err) console.log(err);
			})
		}
		plan.used = plan.used - exists.fileSize;
		plan.remainingStorage = plan.remainingStorage + exists.fileSize;
		const updated = await plan.save();
		await File.findByIdAndDelete(id);
		res.json({
			msg:'File Deleted!',
			updated
		})
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

const shareFile = async(req,res) =>{
	try {
		const {email,url} = req.body;
		if(!email || !url) return res.status(400).json({msg:'Please Provide necessary fields!'});
		const user = await User.findById(req.user._id);
		if(!user) return res.status(400).json({msg:'User not found!'});
		const filename = url.split('files/')[1];
		emailProcessor({
			to:email,
			emailfrom:user.email,
			filename:filename,
			pathurl:url,
			type:"share-file"
		});
		res.status(200).json({msg:'File Shared Successfully!'});
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

module.exports = {
	myFiles,
	addFiles,
	removeFile,
	shareFile
}