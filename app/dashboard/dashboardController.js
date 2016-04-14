'use strict';

angular.module('dashboard', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardController',
  });
}])


.controller('DashboardController', ['$scope', 'FirebaseService',
  function($scope, FirebaseService) {
    $scope.users = [];

    $scope.queryAllUsers = function(){
      FirebaseService.cultureCodes().all().then(function(response){
        console.log("Cc", response.length);
        FirebaseService.users().all().then(function(response){
          console.log("Us", response.length);
          FirebaseService.putForwards().all().then(function(response){
            console.log("Pf", response.length);
            FirebaseService.endorsements().all().then(function(response){
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