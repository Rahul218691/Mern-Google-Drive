const router = require('express').Router();
const {register,activateAccount,login,logout,generateAccessToken,
forgotPassword,resetPassword} = require('../controllers/authController');
const {userSigninValidator,userSignupValidator} = require('../utils/validators/auth');
const {runValidation} = require('../utils/validators');


router.post('/register',userSignupValidator,runValidation,register);
router.post('/activate',activateAccount);
router.post('/login',userSigninValidator,runValidation,login);
router.post('/logout',logout);
router.post('/refresh_token',generateAccessToken);
router.post('/forgotpass',forgotPassword);
router.post('/resetpassword',resetPassword);

module.exports = router;