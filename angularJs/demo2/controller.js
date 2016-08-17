/**
 * Created by admin on 2016/8/2.
 */

'use strict';

/* controllers */
var phonecatControllers = angular.module('phonecatControllers',[]);

phonecatControllers.controller('PhoneListCtrl',['$scope','test','constanttest',function($scope,test,constanttest){
    $scope.test = test;
    $scope.constanttest = constanttest;
    $scope.test2 = test2;
}]);