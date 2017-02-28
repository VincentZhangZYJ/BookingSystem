/**
 * Created by Yujian on 2017/2/5.
 */
angular.module('mainController',['authServices'])
.controller('mainCtrl',function(Auth,$http,$timeout,$location,$rootScope){
    var app=this;
    $rootScope.$on('$routeChangeStart',function(){
        if(Auth.isLoggedIn()){
            console.log('user login already');
            app.isLoggedIn=true;
            Auth.getUser().then(function(data){
                console.log(data);
                app.username=data.data.username;
                app.email=data.data.email;
            });
        }else{
            console.log('user not logged in');
            app.isLoggedIn=false;
            app.username='';
        }
    });

    this.doLogin=function(loginData){
        app.load=true;
        app.errorMsg=false;
        console.log('register');
        console.log('form submitted');
        console.log(this.loginData);
        Auth.login(app.loginData).then(function(data){
            console.log(data.data.success);
            console.log(data.data.message);
            if(data.data.success){
                app.load=false;
                app.successMsg=data.data.message+'...Redicting';
                $timeout(function(){
                    $location.path('/management');
                },2000);

            }else{
                app.load=false;
                app.errorMsg=data.data.message;
            }
        });
    };
    this.logout=function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function(){
            $location.path('/')
        },3000);
    }
});