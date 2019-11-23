const validator = require("validator");


module.exports = app => {
  app.post("/user/register", (req, res) => {
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
  
    app.app.controllers.user.register(app, req, res);
  });
  app.post("/auth/login",async (req, res) => {
      const {email, password} = req.body;
      if(validator.isEmpty(email)){
          res.render('../views/login',{error:'email is empty',data:{}})
      }
      if(validator.isEmpty(password)){
        res.render('../views/login',{error:'password is empty',data:{}})
    }
    if(!validator.isEmail(email)){
        res.render('../views/login',{error:'malformatted email',data:{}})
    }

    app.app.controllers.user.login(app,req,res)
  });
};
