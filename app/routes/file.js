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
};
