const router = require('express').Router();
const {createFolder,getMyFolders
,subFolders,deleteFolder} = require('../controllers/folderController');
const {protect} = require('../middleware/auth');


router.get('/myfolders',protect,getMyFolders);
router.get('/folders/:id',protect,subFolders);

router.post('/createfolder',protect,createFolder);

router.delete('/deletefolder/:id',protect,deleteFolder);

module.exports = router;