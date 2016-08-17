/**
 * Created by admin on 2016/8/2.
 */

'use strict';

/* App Module */

var test2 = 'tank';

var phonecatApp = angular.module('phonecatApp',[
    'ngRoute',
    'phonecatControllers'
]);

phonecatApp.value('test',{"test":"test222","test1":"test111"});

phonecatApp.constant('constanttest','this is constanttest');

phonecatApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/phones',{
                templateUrl:'partials/phone-list.html'
            }).
            when('/phones/:phoneId',{
                templateUrl:'partials/phone-detail.html',
                controller:'phoneDetailCtrl'
            }).
            when('/login',{
                templateUrl:'partials/login.html',
                controller:'loginctrl'
            }).
            otherwise({
                redirectTo:'/login'
            });
    }
]);
