const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authconfig = require('../../config/auth')


function generateToken(params = {}) {
    return jwt.sign(params, authconfig.secret, {
      expiresIn: 86400
    });
  }

module.exports.register = async (app, req, res) => {
  const { email, name, password } = req.body;
  await User.create({ email, name, password })
    .then(() => {
      res.render("../views/login", {
        error: null,
        data: "successfully registered!"
      });
    })
    .catch(err => console.log(err));
};
module.exports.login = async (app, req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user)
    return res.render("../views/login", { error: "User not found!", data: false });
  if (!(await bcrypt.compare(password, user.password)))
    return res.render("../views/login", {
      error: "invalid password!",
      data: false
    });

    var token = generateToken({id:user._id})
 return res
    .status(200).set({'authorization':"Bearer " + token})
    .cookie("access_token", "Bearer " + token, {
      expires: new Date(Date.now() + 3600000) 
    }).redirect(301, "/home");
};
