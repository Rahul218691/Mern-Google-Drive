const User = require('../models/userModal');
const Plan = require('../models/planModal');
const {randomNumber} = require('unique-random-number-gen');
const {	hashPassword,
	comparePassword} = require('../helpers/bcrypt.helper');
const {generateAccountToken,verifyAccountToken,
createAccesToken,createRefreshToken,
verifyRefreshToken} = require('../helpers/jwt.helper');
const {emailProcessor} = require('../helpers/email.helper');

const register = async(req,res) =>{
	try {
		const {username,email,password} = req.body;
		const userexists = await User.findOne({email});
		if(userexists) return res.status(400).json({msg:'User with this email already exists'});
		const hashData = await hashPassword(password);
		const code = randomNumber();
		const verifyToken = generateAccountToken(code);
		const user = await User.create({
			username,
			email,
			password:hashData,
			verification:verifyToken
		});
		if(user){
			emailProcessor({
				to:email,
				verification:verifyToken,
				type:'email-verification'
			});
			res.status(201).json({msg:'User Registered successfully a mail has been sent to ur email for verification'});
		}
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

const login = async(req,res) =>{
	try {
		const {email,password} = req.body;
		const user = await User.findOne({email});
		if(!user) return res.status(400).json({msg:'User with this email does not exists!'});
		if(!user.grant) return res.status(400).json({msg:'Please verify your email'});
		const isMatch = await comparePassword(password,user.password);
		if(!isMatch) return res.status(400).json({msg:'Invalid User Credentials'});
		const access_token = createAccesToken({id:user._id});
		const refresh_token = createRefreshToken({id:user._id});
		const plans = await Plan.findOne({user:user._id});
		res.cookie('refreshtoken',refresh_token,{
			httpOnly:true,
			path:'/api/refresh_token',
			maxAge:30*24*60*60*1000
		});
		res.json({
			msg:'Login Success!',
			access_token,
			plans,
			user:{
				...user._doc,
				password:''
			}
		});
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

const activateAccount = async(req,res) =>{
	try {
		const {verification} = req.body;
		if(!verification) return res.status(400).json({msg:'Invalid user'});
		const user = await User.findOne({verification});
		if(!user) return res.status(400).json({msg:'Invalid user'});
		const decode = verifyAccountToken(verification);
		if(typeof(decode) !== undefined){
			user.grant = true;
			user.verification = "";
			await user.save();
			const plan = await Plan.create({
				user:user._id
			});
			return res.json({
				msg:'Account verified successfully'
			});			
		}else{
			return res.status(400).json({
				msg:'Verification link has been expired'
			})			
		}
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

const logout = async(req,res) =>{
	try {
		res.clearCookie('refreshtoken',{
			path:'/api/refresh_token'
		});
		return res.json({
			msg:'Logged Out!'
		})		
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}


const generateAccessToken = async(req,res) =>{
	try {
		const rf_token = req.cookies.refreshtoken;
		if(!rf_token) return res.status(500).json({msg:"Please Login to Continue"});
		const result = verifyRefreshToken(rf_token);
		if(result){
			const user = await User.findById(result.id).select('-password');
			if(!user){
				return res.status(400).json({msg:'User does not exists'})
			}else{
				const access_token = createAccesToken({id:result.id});
				const plans = await Plan.findOne({user:result.id});
				res.json({
					access_token,
					plans,
					user
				})
			}
		}else{
			return res.status(400).json({
				msg:'Please Login to Continue'
			})
		}
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

const forgotPassword = async(req,res) =>{
	try {
		const {email} = req.body;
		const user = await User.findOne({email});
		if(!user) return res.status(400).json({msg:'User not found'});
		const code = Math.floor(1000 + Math.random() * 9000);
		user.verification = code;
		await user.save();
		emailProcessor({
			to:email,
			verification:code,
			type:'forgot-password'
		});			
		res.json({
			msg:'Email has been sent to your account to reset password '
		});	
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}


const resetPassword = async(req,res) =>{
	try {
		const {email,code,password,cf_password} = req.body;
		if(!email || !code || !password || !cf_password) return res.status(400).json({msg:'All fields are required'});
		if(password !== cf_password) return res.status(400).json({msg:'Password do not match'});
		const user = await User.findOne({email,verification:code});
		if(!user) return res.status(400).json({msg:'User not found'});
		const hashData = await hashPassword(password);
		user.password = hashData;
		user.verification = "";
		await user.save();
		res.json({
			msg:'Password Reset Success!'
		});
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}


module.exports = {
	register,
	login,
	activateAccount,
	logout,
	generateAccessToken,
	forgotPassword,
	resetPassword
}