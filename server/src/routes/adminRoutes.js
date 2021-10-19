const router = require('express').Router();
const {getApplicationInfo,transactions,getRevenue} = require('../controllers/adminController');
const {protect,admin} = require('../middleware/auth');


router.get('/applicationinfo',protect,admin,getApplicationInfo)
router.get('/userpayments',protect,admin,transactions);
router.get('/revenue',protect,admin,getRevenue);


module.exports = router;