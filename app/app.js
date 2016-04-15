'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'login', 
  'dashboard',      
  'firebase',
  'profile',
  'putForward',
  'ngMaterial'
])


//////////////////
// Data Services
//////////////////
.factory("FirebaseService", ["$firebaseObject", "$firebaseArray", 
  function($firebaseObject, $firebaseArray){
    var tableNames = ["cultureCode", "endorsement", "putForward", "user"];
    var firebaseUrl = "https://yrma.firebaseio.com/";

    var isValidTableName = function(tableName){
      return (tableNames.indexOf(tableName) < 0 ? false : true);
    };

    var getFirebaseURL = function(tableName){
      tableName = (tableName == 'user' ? tableName + "s" : tableName);

      return (firebaseUrl + tableName);
    };

    var all = function(tableName) {
      if(!isValidTableName(tableName)){
        return;
      }

      var ref = new Firebase(getFirebaseURL(tableName));
      var result = $firebaseArray(ref);

      return result.$loaded();
    };

    var create = function(tableName, data) {
      if(!isValidTableName(tableName)){
        return;
      }

      var ref = new Firebase(getFirebaseURL(tableName));
      var result = $firebaseArray(ref);

      return result.$add(data);
    };

    var remove = function(tableName, data) {
      if(!isValidTableName(tableName)){
        return;
      }

      var ref = new Firebase(getFirebaseURL(tableName));
      var result = $firebaseArray(ref);

      return result.$remove(data);
    };

    /// Put Services Here
    var service = {
      all: all,
      create: create,
      remove: remove
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
    controller: 'DashboardController'
  });
    
    
///$routeProvider.otherwise({redirectTo: '/login'});

}]);


