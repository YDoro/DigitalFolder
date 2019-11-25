const mongoose = require('../../config/database');

const DocSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    name:{
        type:String,
        required:[true,'Name is required']
    },
    content:{
        type:String,
        select:false
    },
    modifiedAt:{
     type:Date,
     default:Date.now()
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        
    }
});
DocSchema.pre('update',(next)=>{
    const time = Date.now();
    this.modifyedAt = time;
    next();
})

module.exports = mongoose.model('Doc',DocSchema);