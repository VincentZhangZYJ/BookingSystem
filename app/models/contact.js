/**
 * Created by Yujian on 2017/2/8.
 */
var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var ContactSchema=new Schema({
    name:{type:String},
    date:{type:String},
    time:{type:String},
    phone:{type:String},
    people:{type:String},
    confirmCode:{type:String},
    email:{type:String},
    table:{type:String},
    message:{type:String}
});
/*UserSchema.pre('save', function(next) {
    // do stuff
    var user=this;
    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err) return next(err);
        user.password=hash;
        next();
    });
});*/
/*bcrypt.hash("bacon", null, null, function(err, hash) {
 // Store hash in your password DB.
 });*/
/*UserSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password);
}*/
module.exports=mongoose.model('Contact',ContactSchema);
