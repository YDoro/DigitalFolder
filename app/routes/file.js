const authMiddleware = require("../middlewares/auth");
const multipart = require("connect-multiparty");
var multipartMiddleware = multipart();

module.exports = app => {
  app.get("/home", authMiddleware, (req, res) => {
    app.app.controllers.file.home(app, req, res);
  });
  app.get("/document/create", authMiddleware, (req, res) => {
    app.app.controllers.file.create(app, req, res);
  });
  app.post("/document/create",authMiddleware,multipartMiddleware,(req, res) => {
      app.app.controllers.file.new(app, req, res);
    }
  );
  app.post("/document/remove/", authMiddleware, (req, res) => {
    app.app.controllers.file.delete(app, req, res);
  });
  app.get("/document/view/:docId",authMiddleware,(req,res)=>{
    app.app.controllers.file.view(app, req, res);
  });
  app.get("/document/edit/:docId",authMiddleware,(req,res)=>{
    app.app.controllers.file.edit(app, req, res);
  });
  app.post("/document/edit/",authMiddleware,(req,res)=>{
    if(req.body.name)  app.app.controllers.file.save(app, req, res);
    else res.render("../views/document/edit", { error: "field name cannot be empty", 
    doc:{
      _id:req.body.docId,
      name:req.body.name,
      content:req.body.content
    },
    
  });
  });
};
