'use strict';

angular.module('profile', ['ngRoute','ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileController'
  });
}])

.controller('ProfileController', ['$scope', 'FirebaseService', function ($scope,FirebaseService) {
    
    $scope.integrity = 4;
    $scope.hardwork = 10;
    $scope.fun = 5;
    $scope.sociable = 8;
    $scope.learning = 3;
    $scope.creativity = 7;
    $scope.endorsements = [{message:'Good'},{message:'Good 1'},{message:'Good 2'},{message:'Good 3'}];
  }]);