'use strict';

angular
    .module('myApp')
	.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/form', {
    templateUrl: 'pf_form/pf-form.html',
    controller: 'pfController'
  }).when('/report', {
    templateUrl: 'pf_form/pf-report.html'
  });
  }])
    .controller('pfController', pfController);

pfController.$inject = ['$http', '$scope'];

function pfController($http, $scope) {
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
			$scope.pf_list = response.val();
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
	console.log(id.constructor.name);
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
	
};