module.exports = (app)=>{
    app.post('/user/register',(req,res)=>{
            app.app.controllers.user.register(app,req,res);
        
    })
}