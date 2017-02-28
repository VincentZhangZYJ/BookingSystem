/**
 * Created by Yujian on 2017/2/9.
 */
angular.module('contactControllers',['contactServices'])
    .controller('contactCtrl',function($http,$location,$timeout,Contact){
        var app=this;
        this.addContact=function(regData){
            console.log(app.regData);
            Contact.create(app.regData).then(function(data){
            if(data.data.success){
                console.log('contact success');
                console.log(data.data.confirmCode);
                $location.path('/review/'+data.data.confirmCode);
            }
        })
        };
        this.regUser=function(regData){
            app.load=true;
            app.errorMsg=false;
            console.log('register');
            console.log('form submitted');
            console.log(this.regData);
            User.create(app.regData).then(function(data){
                console.log(data.data.success);
                console.log(data.data.message);
                if(data.data.success){
                    app.load=false;
                    app.successMsg=data.data.message+'...Redicting';
                    $timeout(function(){
                        $location.path('/home');
                    },2000);

                }else{
                    app.load=false;
                    app.errorMsg=data.data.message;
                }
            });
        };
    });