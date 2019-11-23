module.exports = (app)=>{
    app.get('/',(req,res)=>{
        app.app.controllers.index.home(app,req,res)
    })
    app.post('/login',(req,res)=>{
        app.app.controllers.index.login(app,req,res);
    })
    app.get('/register',(req,res)=>{
        app.app.controllers.index.register(app,req,res);
    })
    app.post('/register',(req,res)=>{
        //TODO register logic
        res.send("chegou")
    })
}