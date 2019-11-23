const mongoose =  require('mongoose');
var url = 'mongodb://localhost/DigitalFolder';
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex', true);
module.exports = mongoose;

