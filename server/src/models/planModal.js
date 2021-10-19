const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const plansSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        required:true,
        ref:'user'
    },
    planType:{
        type:String,
        default:'Free'
    },
    storage:{
        type:String,
        default:'500 MB'
    },
    totalInBytes:{
        type:Number,
        default:524288000
    },
    remainingStorage:{
        type:Number,
        default:524288000
    },
    used:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});

const Plan = mongoose.model('plan', plansSchema)

module.exports = Plan;