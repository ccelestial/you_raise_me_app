'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'login', 
  'dashboard',      
  'firebase',
  'profile',
  'ngMaterial'
])

//////////////////
// Data Services
//////////////////
.factory("FirebaseService", ["$firebaseObject", "$firebaseArray", 
  function($firebaseObject, $firebaseArray){
    var firebaseUrl = "https://yrma.firebaseio.com/";

    // Culture Codes
    var cultureCodes = function (){
      var ccUrl = firebaseUrl + "cultureCode";
      
      var all = function() {
        var ref = new Firebase(ccUrl);
        var result = $firebaseArray(ref);

        return result.$loaded();
      };

      var sub_service = {
        all: all
      };

      return sub_service;
    };

    // Endorsements
    var endorsements = function (){
      var eUrl = firebaseUrl + "endorsement";

      var all = function (){
        var ref = new Firebase(eUrl);
        var result = $firebaseArray(ref);

        return result.$loaded();
      };

      var sub_service = {
        all: all
      };

      return sub_service;
    };

    // Put Forward
    var putForwards = function (){
      var pFUrl = firebaseUrl + "putForward";

      var all = function (){
        var ref = new Firebase(pFUrl);
        var result = $firebaseArray(ref);

        return result.$loaded();
      };

      var sub_service = {
        all: all
      };

      return sub_service;
    };

    // Users
    var users = function () {
      var uUrl = firebaseUrl + "users";

      var all = function() {
        var ref = new Firebase(uUrl);
        var result = $firebaseArray(ref);

        return result.$loaded();
      };

      var sub_service = {
        all: all
      };

      return sub_service;
    };

    /// Put Services Here
    var service = {
      cultureCodes: cultureCodes,
      endorsements: endorsements,
      putForwards: putForwards,
      users: users
    };

    return service;
  }
])

//////////////////
// Route Provider
//////////////////
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardController',
    resolve: {

    }
  });
    
    
  $routeProvider.otherwise({redirectTo: '/login'});
}]);


