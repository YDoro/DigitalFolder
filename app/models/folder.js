const mongoose = require('../../config/database');
//TODO field last change
module.exports = () =>{
const FolderSchema = new mongoose.Schema({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    files:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doc'
    }],
    name:{
        type:String,
        default:'new folder',
    }

});
FolderSchema.pre('update',async (next)=>{
    const folder = mongoose.models.Folder.findOne({user:this.user,name:this.name});
    return new Promise((resolve, reject) => {
        if(folder&&folder.name!=this.name){
            reject(new Error('this folder alredy exists, Please give a diferent name'));
        }
        else{
            resolve();
        }
      });
      next();
    

});
const Folder =  mongoose.model('Folder',FolderSchema);
return Folder;
}