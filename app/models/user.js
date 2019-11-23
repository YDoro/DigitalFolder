const mongoose = require('../../config/database');
const bcryptjs =  require('bcryptjs');
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        minlength:[6,'Name must have more than five characters'],
        maxlength:[50,'Name must have less than fifty characters']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'E-mail is required'],
        lowercase:true,
        validate:[validator.isEmail,'Malformated email']
    },
    password:{
        type:String,
        required:true,
        select:false
    }
});
UserSchema.pre('save', async function (next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;
    next();
});
module.exports =  mongoose.model('User', UserSchema);

