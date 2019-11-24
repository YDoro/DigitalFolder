const authMiddleware = require('../middlewares/auth')
module.exports = (app)=>{
    app.use(authMiddleware);
    app.get('/home',(req,res)=>{
        app.app.controllers.file.home(app, req, res);

    })
    app.get('/document/create',(req,res)=>{
        app.app.controllers.file.create(app, req, res);

    })
    app.post('/document/create',(req,res)=>{
        app.app.controllers.file.new(app, req, res);
    })

}