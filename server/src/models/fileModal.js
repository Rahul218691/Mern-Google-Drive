const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;

const fileSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:'user'
    },
    fileurl:{
        type:String
    },
    fileSize:{
        type:Number
    },
    parent:{
        type:Boolean,
        default:true
    },
    folderid:String
},{
    timestamps:true
});


const File = mongoose.model('file',fileSchema);

module.exports = File;