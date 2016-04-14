'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginControler'
  });
}])


.controller('LoginControler',['$scope','$firebaseSimpleLogin',function($scope,$firebaseSimpleLogin) {
 var firebaseObj = new Firebase("https://you-raise-me-app.firebaseio.com/");    
 var loginObj = $firebaseSimpleLogin(firebaseObj);
    
 $scope.SignIn = function($scope) {
   event.preventDefault();  // To prevent form refresh
    var username = $scope.user.email;
    var password = $scope.user.password;
     
    loginObj.$login('password', {
            email: username,
            password: password
        })
        .then(function(user) {
            // Success callback
            console.log('Authentication successful');
        }, function(error) {
            // Failure callback
            console.log('Authentication failure');
        });
     
    // Auth Logic will be here
 }
 
 
}]);

