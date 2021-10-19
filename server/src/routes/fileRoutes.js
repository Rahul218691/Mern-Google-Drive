const router = require('express').Router();
const {protect} = require('../middleware/auth');
const {myFiles,addFiles,removeFile,shareFile} = require('../controllers/fileController');
const {uploadfile} = require('../helpers/upload.helper');

router.get('/myfiles',protect,myFiles);
router.post('/uploadfile',protect,uploadfile.single('file'),addFiles);
router.post('/sendfile',protect,shareFile);
router.delete('/deletefile/:id',protect,removeFile);


module.exports = router;