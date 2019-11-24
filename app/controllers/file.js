const User = require('../models/user');
const Document = require('../models/document')
module.exports.home = async (app, req, res) => {
    const user = await User.findById(req.userId);
    const documents = await Document.find({user:req.userId});
    if(!user)res.status(400).send('Error,Please try again!')
    res.render("../views/home", { user, documents });
  };