/**
 * Created by Yujian on 2017/2/2.
 */
var express=require('express');
var app=express();
var mongoose=require('mongoose');
var randomString=require('randomstring');
var router=express.Router();
var appRoutes=require('./app/routes/api')(router);
var bodyParser=require('body-parser');
var path=require('path');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname+'/public'));
app.use('/api',appRoutes);
mongoose.connect('mongodb://localhost:27017/tony',function(err){
    if(err){
        console.log('not connected to the database'+err);
    }else{
        console.log('successfully connected');
    }
});
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
})
app.listen(3000,function(){
    console.log('hello');
});