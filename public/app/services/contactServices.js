/**
 * Created by Yujian on 2017/2/9.
 */

angular.module('contactServices',[])
    .factory('Contact',function($http){
        var contactFactory={};
        //User.create(regData);
        contactFactory.create=function(regData){
            return $http.post('/api/contact',regData);
        };
        contactFactory.getUsers=function(){
            return $http.get('/api/management');
        };
        contactFactory.getContact=function(code){
            return $http.get('api/contact/'+code);
        };
        contactFactory.updateContact=function(code,regData){
            console.log('hello');
            console.log(regData);
            return $http.put('api/contact/'+code,regData);
        };
        contactFactory.getContacts=function(){
            return $http.get('api/contacts');
        };
        contactFactory.deleteContact=function(code){
            return $http.delete('api/contact/'+code);
        }

        /*userFactory.getUser=function(id){
            return $http.get('/api/edit'+id);
        }
        userFactory.deleteUser=function(username){
            return $http.delete('api/management'+username);
        }*/
        return contactFactory;
    });