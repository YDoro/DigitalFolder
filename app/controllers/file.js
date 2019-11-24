const User = require("../models/user");
const Document = require("../models/document");
module.exports.home = async (app, req, res) => {
  const user = await User.findById(req.userId);
  const documents = await Document.find({ user: req.userId });
  if (!user) res.status(400).send("Error,Please try again!");
  res.render("../views/home", { user, documents });
};
module.exports.create = async (app, req, res) => {
  const user = await User.findById(req.userId);

  if (!user) res.status(400).send("Error,Please try again!");
  res.render("../views/newDoc");
};
module.exports.new = async (app, req, res) => {
  var fs = require("fs");
  var pdfreader = require("pdfreader");
  const user = await User.findById(req.userId);
  if (!!req.files.fileupload.size) {
    var file = req.files.fileupload;
    var content = "";
    var rows = {};
    async function printRows() {
      content = "";
      Object.keys(rows)
        .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
        .forEach(y => {
          content = content + (rows[y] || []).join(" ") + "\n";
        });
      if (content) {
        await Document.create({
          name: file.originalFilename,
          content,
          user
        });
      
      }
    }
    await fs.readFile(file.path, async (err, data) => {
      if (!err) {
        content = data;
        if (file.originalFilename.includes(".pdf")) {
          new pdfreader.PdfReader().parseFileItems(file.path, (err, item) => {
            if (item) {
              if (!item || item.page) {
                printRows();
                rows = {};
              } else if (item.text)
                (rows[item.y] = rows[item.y] || []).push(item.text);
            }
          });
          return res.status(200).redirect(301, "/home");
        } else {
          await Document.create({
            name: file.originalFilename,
            content,
            user
          });
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
  return res.status(200).redirect(301, "/home");
};
