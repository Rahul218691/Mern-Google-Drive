const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	host:process.env.SMTP_HOST,
	port:process.env.SMTP_PORT,
	secure:false,
	auth:{
		user:process.env.NODEMAILER_USER,
		pass:process.env.NODEMAILER_PASS
	}
});


const send = (info) =>{
	return new Promise(async(resolve,reject) =>{
		try {
			let result = await transporter.sendMail(info);
			console.log(result);
			resolve(result)
		} catch(error) {
			reject(error)
		}
	})
}


const emailProcessor = ({to,verification,type,emailfrom,filename,pathurl}) =>{
	let info = "";
	switch (type) {
		case "email-verification":
			info = {
				from:process.env.NODEMAILER_USER,
				to:to,
				subject:'G-drive Account verification',
				text:'Please Click on the link to verify your account',
				html:require('../utils/emailTemplate')({
					verification:`http://localhost:3000/verification?verify=${verification}`,
					mailType:'verify account',
					maildesc:'An request has been received from your mail to activate G-drive account if not you please discard',
					btntext:'Verify Account'
				})
			};
			send(info);
			break;
		case 'forgot-password':
			info={
				from:process.env.NODEMAILER_USER,
				to:to,
				subject:'G-drive Password Reset',
				text:'Copy the otp to reset your password',
				html:require('../utils/emailTemplate')({
					verification:`http://localhost:3000/forgotpass?email=${to}&otp=${verification}&success=true`,
					mailType:'reset password',
					maildesc:'An request has been received from your mail to reset G-drive account password if not you please discard',
					btntext:'Reset Password'
				})
			};
			send(info);
			break;
		case "share-file":
			info = {
				from:process.env.NODEMAILER_USER,
				to:to,
				subject:'G-drive file shared',
				text:`${to} has shared a file with you`,
				html:`<html>
						<meta charset="utf-8"/>
						<body>
							<div>
								<p>Please Find the attachment shared by ${emailfrom}</p>
								<a href="http://localhost:3000" target="_blank">Click here to create your free storage account.</a>
							</div>
						</body>
					 </html>`,
				attachments:[
					{
						filename:filename,
						path:pathurl
					}
				]
			};
			send(info);
			break;
		default:
			break;
	}
}


module.exports = {emailProcessor};