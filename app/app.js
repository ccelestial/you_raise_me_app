'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'login', 
  'dashboard',      
  'firebase',
  'profile',
  'ngMaterial'
]).
config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardController'
        });
    
    
  $routeProvider.otherwise({redirectTo: '/login'});
}]);


