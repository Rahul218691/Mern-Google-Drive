const router = require('express').Router();
const {protect} = require('../middleware/auth');
const {createOrder,verifyTransaction} = require('../controllers/paymentController');


router.post('/createorder',protect,createOrder);
router.post('/verifypayment',verifyTransaction);

module.exports = router;