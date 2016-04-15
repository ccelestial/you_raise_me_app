'use strict';

angular.module('putForward', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/putForward', {
    templateUrl: 'pf_form/pf_form.html',
    controller: 'PfController'
  });
}])


.controller('PfController', ['$http', '$scope', 'FirebaseService',
  function ($http, $scope, FirebaseService) {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    
    $scope.form = {
      cultureCodeOptions: [],
      employeeOptions: []
    };

    var init = function () {
      FirebaseService.all("cultureCode").then(function(response){
        Materialize.toast('Gone Here!', 3000);
        console.log("Cc", response);
        $scope.form.cultureCodeOptions = response;
        FirebaseService.all("putForward").then(function(response){
          console.log("PF",response);
          FirebaseService.all("user").then(function(response){
            console.log("Us",response);
            FirebaseService.all("endorsement").then(function(response){
              console.log("Ed",response);
            });
          });
        });
      });
    };

    init();

    /* jshint validthis:true */
    $scope.title = 'equityTransactionController';
  	
  	var ref = {};
  	
  	$scope.pfModel = {
  		createdAt: undefined,
  		personId: undefined,
  		cultureCode: undefined,
  		reason: undefined
  	};
  	
  	$scope.getRecord = function(){
  		ref = new Firebase("https://yrma.firebaseio.com/putForward");
  		ref.on("value", function(response){
  			$scope.pf_list = [];
  			$.each(response.val(), function(key, value){
  				var data = {
  					"id": key,
  				};
  				$.extend(data, value);
  				$scope.pf_list.push(data);
  			});
  			console.log($scope.pf_list);
  			$scope.$apply();
  		})
  	}
  	
    activate();

    function activate() {
  		$scope.getRecord();
  		$http.get('pf_form/sample.json').then(function(response){
  			//$scope.pf_list = response.data.pf_list;
  			$scope.users = response.data.users;
  			$scope.cultureCode = response.data.CultureCode
  		});
    }
  	
  	$scope.deleteRecord = function(id){
  		ref = new Firebase("https://yrma.firebaseio.com/putForward/"+id);
  		ref.remove();
  	}
  	
  	$scope.addRecord = function(){
  		ref = new Firebase("https://yrma.firebaseio.com/");
  		var usersRef = ref.child("putForward");
  		var insert = $scope.pfModel;

  		var date = insert.createdAt.getMonth() + "/" + insert.createdAt.getDate() + "/" + insert.createdAt.getFullYear();
  		console.log(date);
  		insert.createdAt = date;
  		usersRef.push().set(insert);
  		$scope.pfModel = {};
  	}
  	
  }]);