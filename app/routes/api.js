/**
 * Created by Yujian on 2017/2/3.
 */
var User=require('../models/user');
var Contact=require('../models/contact');
var jwt=require('jsonwebtoken');
var randomstring=require('randomstring');
var secret='harrypotter';
module.exports=function(router)
{
    router.post('/users', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
            res.send('nod enough passed');
            res.json({success:false,message:'bad input'});
        } else {
            user.save(function (err) {
                if (err) {
                    res.json({success:false,message:'someone already used'});
                } else {
                    res.json({success:true,message:'user created'});
                }
            });
        }


    });
    router.post('/contact',function(req,res){
        var contact = new Contact();
        contact.name = req.body.name;
        contact.date= req.body.date;
        contact.email = req.body.email;
        contact.time=req.body.time;
        contact.phone=req.body.phone;
        contact.people=req.body.people;
        contact.confirmCode=randomstring.generate(6);
        contact.message=req.body.message;
        contact.table=req.body.table;
        console.log(req.body);
        console.log(contact);
        contact.save(function (err) {
            if (err) {
                console.log(err);
                res.json({success:false,message:'someone already used'});
            } else {
                res.json({success:true,message:'contact created',confirmCode:contact.confirmCode});
            }
        });

    });
    router.get('/contact/:code',function(req,res){
        var code=req.params.code;
        Contact.findOne({confirmCode:code},function(err,contact){
            res.json({success:true,contact:contact});
        })
    });
    router.put('/contact/:code',function(req,res){
       var code=req.params.code;
        console.log(code);
        Contact.findOne({confirmCode:code},function(err,contact){
            contact.name=req.body.name;
            contact.date= req.body.date;
            contact.email = req.body.email;
            contact.time=req.body.time;
            contact.phone=req.body.phone;
            contact.people=req.body.people;
            contact.message=req.body.message;
            contact.table=req.body.table;
            contact.save(function(err){
                res.json({success:true});
            })
        })
    });
    router.get('/contacts',function(req,res){
        Contact.find({},function(err,contacts){
            if(err){
                throw err;
            }
            res.json({success:true,contacts:contacts});
        })
    });
    router.delete('/contact/:code',function(req,res){

            var deleteCode=req.params.code;
            Contact.findOneAndRemove({confirmCode:deleteCode},function(err,contactr){
                if(err) throw err;
                res.json({success:true});
            });

    });
/*    router.put('/edit',function(req,res){
        var editName=req.body.username;
        var newName=req.body.name;
        User.findOne({username:editUser},function(err,user){
            user.name=newName;
            user.save(function(err){
                if(err){

                }else{
                    res.json({success:true })
                }
            })
        })
    })*/
    router.get('/management',function(req,res){
        User.find({},function(err,users){
            if(err){
                throw err;
            }
            res.json({success:true,users:users});
        })
    });
    router.delete('/management/:user',function(req,res){
        var deleteUser=req.params.username;
        User.findOneAndRemove({username:deleteUser},function(err,user){
            if(err) throw err;
            res.json({success:true});
        });
    });
    router.get('/edit/:id',function(req,res){
        var editUser=req.params.id;
        User.findOne({_id:editUser},function(err,user){
            res.json({success:true,user:user});
        })
    })
    router.put('/edit',function(req,res){
        var editName=req.body.username;
        var newName=req.body.name;
        User.findOne({username:editUser},function(err,user){
            user.name=newName;
            user.save(function(err){
                if(err){

                }else{
                    res.json({success:true })
                }
            })
        })
    })
    router.post('/authenticate',function(req,res){
        User.findOne({username:req.body.username}).select('email username password').exec(function(err,user){
            if(err) throw err;
            if(!user){
                res.json({success:false,message:'Could not authenticate user'});
            }else if(user){
                if(req.body.password){
                    console.log(user.password);
                    var validPassword=user.comparePassword(req.body.password);
                }else{
                    res.json({success:false,message:'No password provided'});
                }

                if(!validPassword){
                    res.json({success:false,message:'Could not authenticate password'});
                }else{
                   var token= jwt.sign({
                       username:user.username,email:user.email
                    },secret,{expiresIn:'24h'});
                    res.json({success:true,message:'User authenticated!',token:token});
                }
            }
        })
    });
    router.use(function(req,res,next){
       var token=req.body.token||req.body.query||req.headers['x-access-token'];
        if(token){
            jwt.verify(token,secret,function(err,decoded){
                if(err){
                    res.json({success:false,message:'invalid token'});
                }else{
                    req.decoded=decoded;
                    next();
                }
            });
        }else{
            res.json({success:false,message:'No token'})
        }
    });
    router.post('/me',function(req,res){
        res.send(req.decoded);
    });
/*    var ContactSchema=new Schema({
        name:{type:String,required:true},
        date:{type:String,required:true},
        time:{type:String,required:true},
        phone:{type:String,required:true},
        people:{type:String,required:true},
        confirmCode:{type:String,required:true},
        email:{type:String,required:true},
        message:{type:String,required:true}
    });*/

    return router;
}