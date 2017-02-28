/**
 * Created by Yujian on 2017/2/4.
 */
angular.module('userControllers',['userServices'])
    .controller('regCtrl',function($http,$location,$timeout,User){
        var app=this;
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