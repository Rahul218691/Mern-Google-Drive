const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/profile");
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
});

const filestorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/files");
    },
    filename: function (req, file, cb) {
        // console.log(req.body.name)
        // const parts = file.mimetype.split("/");
        // cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`)        
    }
});


const upload = multer({storage});
const uploadfile = multer({storage:filestorage});

module.exports = {
	upload,
    uploadfile
}