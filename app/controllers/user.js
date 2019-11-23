const User = require("../models/user");
const validator = require("validator");

module.exports.register = async (app, req, res) => {
  const { email, name, password, password_confirm } = req.body;
  //TODO redirect to register with error
  if (!validator.isEmail(email)) 
    res.send("malformatted email");
  if (validator.isEmpty(password)) 
    res.send("please type a password");
  if (password != password_confirm) 
    res.send("passwords doesn't match");
  if (!validator.isLength(name, { min: 6, max: 50 }))
    res.send("name must have between 5 and 50 characters");
    //TODO redirect to home with messages
    await User.create({email, name, password}).then(()=>{
        res.status(201).send('successfully registered!')
    }).catch(err=>console.log(err))
};
