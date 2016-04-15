'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'login', 
  'dashboard',      
  'firebase',
  'profile',
  'endorsement',
  'putForward',
  'putForwardReport',
  'ngMaterial'
])

//////////////////
//User Service
//////////////////
.factory("User", function () {
    var data = {};
    var set = function (value) {
            data = value;
        };
    
    var get =  function () {
            return data;
        };
        
    var service =
    {
      get:get,
      set:set,
      data:data
    }
    
    return service
})

//////////////////
// Data Services
//////////////////
.factory("FirebaseService", ["$firebaseObject", "$firebaseArray", "$q",
  function($firebaseObject, $firebaseArray, $q){
    var tableNames = ["cultureCode", "endorsement", "putForward", "user"];
    var firebaseUrl = "https://yrma.firebaseio.com/";

    var isValidTableName = function(tableName){
      return (tableNames.indexOf(tableName) < 0 ? false : true);
    };

    var getFirebaseURL = function(tableName){
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

    var updateOrCreate = function(tableName, data){
      console.log("RISPANS", data);
      var defer = $q.defer();

      update(tableName, data).then(function(response){
        console.log("RISPANS", response);
        if(!response){
          create(tableName, data).then(function(response){
            defer.resolve(response);
          });
        } else {
          defer.resolve(response);
        }
      });

      return defer.promise;
    };

    var update = function(tableName, data){
      if(!isValidTableName(tableName)){
        return;
      }
      var defer = $q.defer();

      find(tableName, data.id).then(function(response){
        if(response && response.length > 0) {
          response[0].email = data.email;
          response[0].id = data.id;
          response[0].imageUrl = data.imageUrl;
          response[0].name = data.name;
          response.$save(0).then(function(ref){
            defer.resolve(response[0]);
          })
        } else {
          defer.resolve();
        }
      });

      return defer.promise;
    };

    var create = function(tableName, data) {
      if(!isValidTableName(tableName)){
        return;
      }

      var ref = new Firebase(getFirebaseURL(tableName));
      var result = $firebaseArray(ref);
      
      return result.$add(data);
    };

    var find = function(tableName, id) {
      if(!isValidTableName(tableName)){
        return;
      }

      var defer = $q.defer();
            
      var reportsRef = new Firebase(getFirebaseURL(tableName)).orderByChild('id').equalTo(id).limitToFirst(1); //// load 5 last reports, 15 minutes ago.
      var reportsArray = $firebaseArray(reportsRef);
      
      reportsArray.$loaded().then(function () {
          defer.resolve(reportsArray); 
      });
      
      return defer.promise;
    };

    var remove = function(tableName, data) {
      console.log(tableName, data);
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
      updateOrCreate: updateOrCreate,
      update: update,
      find: find,
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
  }).when('/putForward/report', {
    templateUrl: 'pf_form/pf-report.html',
    controller: 'PfReportController'
  }).when('/putForward', {
    templateUrl: 'pf_form/pf_form.html',
    controller: 'PfController'
  });
///$routeProvider.otherwise({redirectTo: '/login'});

}]);


