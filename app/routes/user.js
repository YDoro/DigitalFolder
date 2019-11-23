const validator = require("validator");

module.exports = app => {
  app.post("/user/register", (req, res) => {
    const { email, name, password, password_confirm } = req.body;
    if (!validator.isEmail(email))
      res.render("../views/register", {
        error: "malformatted email",
        data: null
      });

    if (validator.isEmpty(password))
      res.render("../views/register", {
        error: "please type a password",
        data: null
      });
    if (password != password_confirm)
      res.render("../views/register", {
        error: "passwords doesn't match",
        data: null
      });

    if (!validator.isLength(name, { min: 6, max: 50 }))
      res.render("../views/register", {
        error: "name must be between 5 and 50 characters",
        data: null
      });

    app.app.controllers.user.register(app, req, res);
  });
  app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    if (validator.isEmpty(email)) {
      res.render("../views/login", { error: "email is empty", data: null });
    }
    if (validator.isEmpty(password)) {
      res.render("../views/login", { error: "password is empty", data: null });
    }
    if (!validator.isEmail(email)) {
      res.render("../views/login", { error: "malformatted email", data: null });
    }

    app.app.controllers.user.login(app, req, res);
  });
};
