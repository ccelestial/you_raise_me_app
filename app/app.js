'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.login',       
  'firebase'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);


//$routeProvider.when('/login', {
//templateUrl: 'login/login.html',
//        controller: 'LoginController'
//    });