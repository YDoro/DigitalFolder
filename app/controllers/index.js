const User = require('../models/user');

module.exports.home = (app,req,res)=>{
    res.render('../views/home',{errors:{},data:{}})
}
module.exports.login =async (app,req,res)=>{
   const user  = await User.findOne({email:req.body.email});
    if(user) return res.send('OK');
    res.render('../views/home',{error:'user not found',data:{}})
}
module.exports.register = async (app,req,res)=>{
    res.render('../views/register',{error:false,data:{}})

}