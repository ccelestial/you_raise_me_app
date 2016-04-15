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
        Materialize.toast('Login Failed! </br> Please contact your administrator.', 3000);
        console.log("Login Failed!", error);
      } else {
        var thisuser = 
          {
            "id":authData.google.id,
            "email":authData.google.email,
            "name":authData.google.displayName,
            "imageUrl":authData.google.profileImageURL
          };
        FirebaseService.updateOrCreate("user", thisuser).then(function(response){
          Materialize.toast("Hi " +response.name + "! </br> Welcome back!", 3000);
        })
      }
    },
    {scope: "email"}
    );
      // Auth Logic will be here
    }     
}]);

