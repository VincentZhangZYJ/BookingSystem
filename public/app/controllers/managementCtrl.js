/**
 * Created by Yujian on 2017/2/9.
 */
angular.module('managementController',['contactServices'])
.controller('managementCtrl',function(Contact){
    var app=this;
    app.limit=5;
    function getContacts(){
        Contact.getContacts().then(function(data){
            if(data.data.success){
                app.contacts=data.data.contacts;
            }else{
                app.errorMsg=data.data.message;
            }
        });
    }
   getContacts();
    app.deleteContact=function(code){
        Contact.deleteContact(code).then(function(data){
            if(data.data.success){
                getContacts();
            }
        })
    }
    app.deleteUser=function(username){
        User.deleteUser(username).then(function(data){
            if(data.data.success){
                getUsers();
            }
        })
    }
})
.controller('editCtrl',function($scope,$routeParams,Contact,$location,$timeout){
   /* $routeParams.id*/
    var app=this;
    app.code=$routeParams.confirmCode;
    console.log(app.code);
    function getContact() {

            Contact.getContact(app.code).then(function (data) {
                if (data.data.success) {
                    app.contact = data.data.contact;
                    console.log(app.contact);
                } else {
                    app.errorMsg = data.data.message;
                }
            });

    }
    getContact();
    app.updateContact=function(code,data){
        console.log('hello');
        console.log(app.contact.confirmCode);
        console.log(app.contact);
        Contact.updateContact(app.contact.confirmCode,app.contact).then(function(data){
            if(data.data.success){
                console.log('updated');
                $timeout(function(){
                    $location.path('/management');
                },1000);
            }
        })
    }
})