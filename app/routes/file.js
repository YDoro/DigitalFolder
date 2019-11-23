module.exports = (app)=>{
    app.get('/file',(req,res)=>{
        res.send('File is OK!')
    })
}