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
	var users = [];
	var endorsements = [];
	$scope.topThree = []
	
	var putForwardList = [];
	var cultureCodes = [];
	
	var topThreeEndorsed = function(){
		return users.sort(function(obj1, obj2) {
			return obj1.endorsements - obj2.endorsements;
		}).slice(0, 3)
	}
  
	var getUsers = function(){
       FirebaseService.all("user").then(function(response){
		  users = response;
		  getEndorments();
       });
	 };
	 
	 var getEndorments = function(){
       FirebaseService.all("endorsement").then(function(response){
		  endorsements = response;
		  console.log("EN", endorsements);
		  initializeTopEndorsed();
       });
	 };
	 
	 var getEndorsementCount = function(userId){
		var result = []
		if(endorsements.length){
			var result = endorsements.filter(function(endorsement){
				return endorsement.endorsedPersonId == userId;
			});
		}
		
		return result.length;
	 };
	 
	 var initializeTopEndorsed = function() {
		angular.forEach(users, function(user){
			user.endorsements = getEndorsementCount(user.id);
		});
		
		
		$scope.topThree = topThreeEndorsed();
		console.log("Toph", $scope.topThree);
	 };
	 
	  
	 var getCultureCode = function(){
       FirebaseService.all("cultureCodes").then(function(response){
		  cultureCodes = response;
		  console.log("CC", cultureCodes);
		  getPutForwards();
       });
	 };
	
	var getPutForwards = function(){
       FirebaseService.all("putForward").then(function(response){
		  putForwardList = response;
		  console.log("PF", putForwardList);
       });
	 };
	 
	  
	  var init = function(){
		getUsers();
	  };
	  
	 init();
	
  }
  
  
]);