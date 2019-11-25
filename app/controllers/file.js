const User = require("../models/user");
const Document = require("../models/document");



//=============================================================================
module.exports.home = async (app, req, res) => {
  const user = await User.findById(req.userId);
  const documents = await Document.find({ user: req.userId });
  if (!user) res.status(400).send("Error,Please try again!");
  res.render("../views/home", { user, documents });
};


//=============================================================================
module.exports.create = async (app, req, res) => {
  const user = await User.findById(req.userId);

  if (!user) res.status(400).send("Error,Please try again!");
  res.render("../views/document/create");
};



//=============================================================================
module.exports.new = async (app, req, res) => {
  var fs = require("fs");
  var pdfreader = require("pdfreader");
  const user = await User.findById(req.userId);
  if (!!req.files.fileupload.size) {
    var file = req.files.fileupload;
    var content = "";
    var rows = {};
    async function printRows(end) {
      Object.keys(rows)
        .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
        .forEach(y => {
          content = content+(rows[y] || []).join(" ") ;
        });
      if (end) {
        await Document.create({
          name: file.originalFilename,
          content,
          user
        });
        res.status(200).redirect(301, "/home");
      }
    }
    await fs.readFile(file.path, async (err, data) => {
      if (!err) {
        if (file.originalFilename.includes(".pdf")) {
          new pdfreader.PdfReader().parseFileItems(file.path, (err, item) => {
            if (!item) {
              printRows(true);
              rows = {};
            } else if (item.page) {
              printRows(false);
              rows = {};
            } else if (item.text)
              (rows[item.y] = rows[item.y] || []).push(item.text+'\n');
          });
        } else {

          await Document.create({
            name: file.originalFilename,
            content:data,
            user
          });
          res.status(200).redirect(301, "/home");
        }
      } else {
        console.log(err);
      }
    });
  } else {
    if (req.body.name.replace(" ", "") != "") {
      await Document.create({
        name: req.body.name,
        content: req.body.content,
        user
      });
    }
  }

  if (!user) res.status(400).send("Error,Please try again!");
};

//=============================================================================
module.exports.delete = async (app,req,res)=>{
  var doc = await Document.findById(req.body.id);
  const user = await User.findById(req.userId);
  if(user._id+'' === doc.user+''){  
    await doc.remove();
    res.status(200).redirect(301, "/home");

} else{
  res.status(403).send('Permission denied');
}
}
//=============================================================================
module.exports.view = async(app,req,res)=>{
  var doc = await Document.findById(req.params.docId).select('+content');
  const user = await User.findById(req.userId);
  if(user._id+'' === doc.user+'')  res.render("../views/document/view",{doc});
  else res.status(403).send('Permission denied');
}
