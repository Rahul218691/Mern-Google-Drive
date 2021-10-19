const Folder = require('../models/folderModal');
const File = require('../models/fileModal');
const Plan = require('../models/planModal');
const fs = require('fs');
const path = require('path');

const createFolder = async(req,res) =>{
	try {
		const {foldername,id} = req.body;
		const newfolder = await Folder.create({
			foldername,
			user:req.user._id,
			parent:id ? false : true,
			parentid:id
		});
		res.json({
			msg:'Folder Created Successfully!',
			newfolder
		})
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

const getMyFolders = async(req,res) =>{
	try{
		const folders = await Folder.find({user:req.user._id,parent:true});
		res.json({folders});
	}catch(err){
		return res.status(500).json({msg:err.message});
	}
}

const subFolders = async(req,res) =>{
	try {
		const folders = await Folder.find({user:req.user._id,parent:false,parentid:req.params.id});
		const files = await File.find({user:req.user._id,folderid:req.params.id}).sort('-createdAt');
		res.json({folders,files});
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}


const deleteFolder = async(req,res) =>{
	try {
		const {id} = req.params;
		const folder = await Folder.findById(id);
		if(!folder) return res.status(400).json({msg:'Folder not found!'});
		const planfetch = await Plan.findOne({user:req.user._id});
		if(!planfetch) return res.status(400).json({msg:'Active Plan not found!'});
		const checksubfolder = await Folder.find({parentid:id});
		if(checksubfolder.length > 0) return res.status(400).json({msg:'Please delete the sub folders'});
		const checksubfiles = await File.find({folderid:id});
		if(checksubfiles.length < 1){
			await Folder.findByIdAndDelete(id);
			res.json({
				msg:'Folder Deleted Successfully!'
			});
		}else{
			checksubfiles.map((data) =>{
				let spliturl = data.fileurl.split('files/')[1];
				let pathinfo = path.join(__dirname,`../../uploads/files/${spliturl}`);
				fs.unlink(pathinfo,(err)=>{
					if(err) console.log(err);
				});
			});
			let totalSize = checksubfiles.reduce(function (accumulator, files) {
			  return accumulator + files.fileSize;
			}, 0);

			planfetch.used = planfetch.used - totalSize;
			planfetch.remainingStorage = planfetch.remainingStorage + totalSize;
			const updated = await planfetch.save();			
			await Folder.findByIdAndDelete(id);
			await File.deleteMany({folderid:id});
			res.json({
				msg:'Folder Deleted Successfully!',
				plan:updated
			});
		}
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}


module.exports = {
	createFolder,
	getMyFolders,
	subFolders,
	deleteFolder
}