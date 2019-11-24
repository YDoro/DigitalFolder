const User = require('../models/user');
const Document = require('../models/document')
module.exports.home = async (app, req, res) => {
    const user = await User.findById(req.userId);
    const documents = await Document.find({user:req.userId});
    if(!user)res.status(400).send('Error,Please try again!')
    res.render("../views/home", { user, documents });
  };
  module.exports.create = async (app, req, res) => {
    const user = await User.findById(req.userId);
   
    if(!user)res.status(400).send('Error,Please try again!')
    res.render("../views/newDoc");
  };
  module.exports.new = async (app, req, res) => {
    const user = await User.findById(req.userId);
    await Document.create({
        name:req.body.name,
        content:req.body.content,
        user,
    })
    if(!user)res.status(400).send('Error,Please try again!');
    return res
    .status(200).redirect(301, "/home");
  };