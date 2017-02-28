/**
 * Created by Yujian on 2017/2/4.
 */
angular.module('userServices',[])
    .factory('User',function($http){
        var userFactory={};
        //User.create(regData);
        userFactory.create=function(regData){
            return $http.post('/api/users',regData);
        };
        userFactory.getUsers=function(){
            return $http.get('/api/management');
        };
        userFactory.getUser=function(id){
            return $http.get('/api/edit'+id);
        }
        userFactory.deleteUser=function(username){
            return $http.delete('api/management'+username);
        }
        return userFactory;
    });