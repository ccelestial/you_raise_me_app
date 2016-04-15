'use strict';

angular.module('login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginController'
  });
}])


.controller('LoginController', ['$scope','$firebaseAuth','FirebaseService', '$window',
  function($scope, $firebaseSimpleLogin, FirebaseService, $window) {
  
  $scope.SignIn = function(event) {
    var ref = new Firebase("https://yrma.firebaseio.com");
     ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        var thisuser = 
          {
            "id":authData.google.id,
            "email":authData.google.email,
            "name":authData.google.displayName,
            "imageUrl":authData.google.profileImageURL
          };
        console.log("Ito Yung User", thisuser);
        FirebaseService.create("user", thisuser).then(function(response){
        })
      }
    },
    {scope: "email"}
    );
      // Auth Logic will be here
    }     
}]);

