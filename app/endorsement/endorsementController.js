'use strict';

angular.module('endorsement', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/endorsement', {
    templateUrl: 'endorsement/endorsement.html',
    controller: 'EndorsementController',
  })
}])


.controller('EndorsementController', ['$scope', 'FirebaseService','$window',
  function($scope, FirebaseService, $window) {
    $scope.users = [];
    var queryAllUsers = function(){
        FirebaseService.all("user").then(function(response){
          $scope.users = response;
      })
    }
    queryAllUsers();
  }]);