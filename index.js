var app = require('./config/server');
var port = 5200;
app.listen(port,()=>{
    console.log(`Server listening at port ${port}`);
})