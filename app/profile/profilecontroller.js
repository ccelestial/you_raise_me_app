'use strict';

angular.module('profile', ['ngRoute','ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileController'
  });
}])

.controller('ProfileController', ['$scope', function ($scope) {
    $scope.grid = [[1,2,3],[4,5,6],[7,8,9]];
  }]);