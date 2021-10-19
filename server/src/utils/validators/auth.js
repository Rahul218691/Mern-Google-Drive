const {check} = require('express-validator');


exports.userSignupValidator = [
    check('username').not().isEmpty().withMessage('UserName is Required'),
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password').isLength({min:6}).withMessage('Password must be atleast 6 character long')
]

exports.userSigninValidator = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password').isLength({min:6}).withMessage('Password must be atleast 6 character long')
]