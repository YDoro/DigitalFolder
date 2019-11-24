const authMiddleware = require('../middlewares/auth')
module.exports = (app)=>{
    app.use(authMiddleware);
    app.get('/home',(req,res)=>{
        app.app.controllers.file.home(app, req, res);

    })
}