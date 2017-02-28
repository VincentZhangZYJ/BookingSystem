/**
 * Created by Yujian on 2017/2/9.
 */
angular.module('reviewControllers',['contactServices'])
    .controller('reviewCtrl',function($http,$location,$timeout,Contact,$routeParams){
        var app=this;


        app.code=$routeParams.confirmCode;
        if(app.code===undefined){
            app.havecode=false;
        }else{
            app.havecode=true;
        }
        console.log(app.code);
        app.showResult=false;
        app.getContact=function(code) {
            console.log(app.confirmCode);
            Contact.getContact(app.confirmCode).then(function (data) {
                if (data.data.success) {
                    app.showResult=true;
                    app.contact = data.data.contact;
                    console.log(app.contact);
                } else {
                    app.errorMsg = data.data.message;
                }
            });
        }
        app.updateContact=function(code,data){
        Contact.updateContact(app.confirmCode,app.contact).then(function(data){
            if(data.data.success){
                console.log('updated');
            }
        })
        }

    });