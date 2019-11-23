const mongoose = require('../../config/database');
module.exports = () =>{
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
    modifyedAt:{
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
const Document =  mongoose.model('Doc',DocSchema);
return Document;
}