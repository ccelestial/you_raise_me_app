'use strict';

angular.module('login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginController'
  });
}])


.controller('LoginController', ['$scope','$firebaseSimpleLogin','$window',
  function($scope, $firebaseSimpleLogin, $window) {
      
    var firebaseObj = new Firebase("https://you-raise-me-app.firebaseio.com/");    
    var loginObj = $firebaseSimpleLogin(firebaseObj);
       
    $scope.SignIn = function(event) {
      event.preventDefault();  // To prevent form refresh
        
      var username = $scope.email;
      var password = $scope.password;
        
      loginObj.$login('password', {
        email: username,
        password: password
      })
      .then(function(user) {
        // Success callback
        console.log('Authentication successful');
        window.location.href = 'dashboard/dashboard.html';
      }, function(error) {
        // Failure callback
        console.log('Authentication failure');
      });
        
       // Auth Logic will be here
    }
 
}]);

