const router = require('express').Router();
const {protect} = require('../middleware/auth');
const {updateProfile,updatePassword,deleteAccount,getMyPayments} = require('../controllers/userController');
const {upload} = require('../helpers/upload.helper');


router.get('/mypayments',protect,getMyPayments);

router.post('/updateprofile',protect,upload.single('profile'),updateProfile);

router.put('/updatepass',protect,updatePassword);

router.delete('/deleteaccount',protect,deleteAccount);


module.exports = router;