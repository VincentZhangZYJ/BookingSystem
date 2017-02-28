/**
 * Created by Yujian on 2017/2/4.
 */
angular.module('userApp',['appRoutes','userControllers','userServices','ngAnimate','mainController','authServices','managementController','contactServices','contactControllers','reviewControllers'])
.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptors');
})