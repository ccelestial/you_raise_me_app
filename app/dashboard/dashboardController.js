'use strict';

angular.module('dashboard', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardController',
  });
}])


.controller('DashboardController', ['$scope', 'FirebaseService','$window',
  function($scope, FirebaseService, $window) {
    $scope.users = [];
    $scope.queryAllUsers = function(){
      FirebaseService.all("cultureCode").then(function(response){
        console.log("Cc", response.length);
        FirebaseService.all("user").then(function(response){
          console.log("Us", response.length);
          FirebaseService.all("putForwards").then(function(response){
            console.log("Pf", response.length);
            FirebaseService.all("endorsements").then(function(response){
              console.log("En", response.length);
            });
          });
        });
      });
      // var ref = new Firebase("https://yrma.firebaseio.com/users");
      // // ref.orderByChild("height").on("child_added", function(snapshot) {
      // //   console.log(snapshot.key() + " was " + snapshot.val().height + " meters tall");
      // // });
      // ref.on('value', function(ds){
      //   $scope.users = ds.val();
      //   $scope.$apply();
      // });
    };
  }
]);