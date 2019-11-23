module.exports = (app)=>{
    app.get('/folder',(req,res)=>{
        res.send('Folder is OK!')
    })
}