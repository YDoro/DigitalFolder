const User = require("../models/user");
const bcrypt = require("bcryptjs");
module.exports.register = async (app, req, res) => {
    //TODO redirect to home with messages
    await User.create({email, name, password}).then(()=>{
        res.status(201).send('successfully registered!')
    }).catch(err=>console.log(err))
};
module.exports.login = async (app,req,res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.render('../views/login',{error:'User not found!',data:{}})
    if (!(await bcrypt.compare(password, user.password)))
      return  res.render('../views/login',{error:'invalid password!',data:{}})
    return res.send("wellcome!")
}
