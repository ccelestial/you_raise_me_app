'use strict';

angular.module('putForward', ['ngRoute'])



.controller('PfController', ['$http', '$scope', 'FirebaseService',
  function ($http, $scope, FirebaseService) {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    

    $scope.putForwards = [];

    $scope.form = {
      cultureCodeOptions: [],
      employeeOptions: [],
    };

    var init = function () {
      FirebaseService.all("cultureCode").then(function(response){
        $scope.form.cultureCodeOptions = response;
        FirebaseService.all("putForward").then(function(response){
          $scope.putForwards = response;
          FirebaseService.all("user").then(function(response){
            $scope.form.employeeOptions = response;
          });
        });
      });
    };

    init();

    /* jshint validthis:true */
   //  $scope.title = 'equityTransactionController';
  	
  	// var ref = {};
  	
  	$scope.pfModel = {
  		createdAt: new Date(),
  		personId: undefined,
  		cultureCode: undefined,
  		reason: undefined
  	};
  	
  	// $scope.getRecord = function(){
  	// 	ref = new Firebase("https://yrma.firebaseio.com/putForward");
  	// 	ref.on("value", function(response){
  	// 		$scope.pf_list = [];
  	// 		$.each(response.val(), function(key, value){
  	// 			var data = {
  	// 				"id": key,
  	// 			};
  	// 			$.extend(data, value);
  	// 			$scope.pf_list.push(data);
  	// 		});
  	// 		console.log($scope.pf_list);
  	// 		$scope.$apply();
  	// 	})
  	// }
  	
   //  activate();

   //  function activate() {
  	// 	$scope.getRecord();
  	// 	$http.get('pf_form/sample.json').then(function(response){
  	// 		//$scope.pf_list = response.data.pf_list;
  	// 		$scope.users = response.data.users;
  	// 		$scope.cultureCode = response.data.CultureCode
  	// 	});
   //  }
  	
  	$scope.deleteRecord = function(data){
      console.log(data);
      FirebaseService.remove("putForward", data).then(function(response){
        Materialize.toast('Successfully deleted!', 2000);
      });
  		// ref = new Firebase("https://yrma.firebaseio.com/putForward/"+id);
  		// ref.remove();
  	}

    $scope.getName = function(id){
      var result = $scope.form.employeeOptions.filter(function(employee){
        return employee.id == id
      });

      return (result.length ? result[0].name : "Unknown");
    };

    var pfDecorator = function(){
      var data = {
        createdAt: $scope.pfModel.createdAt ? $scope.pfModel.createdAt.toString() : new Date(),
        personId: $scope.pfModel.personId,
        cultureCode: $scope.pfModel.cultureCode,
        reason: $scope.pfModel.reason
      };

      return data;
    }
  	
  	$scope.addRecord = function(){
      console.log("add Record", pfDecorator());

      FirebaseService.create("putForward", pfDecorator()).then(function(response){
        if(response){
          Materialize.toast('Record created!', 2000);
        } else{
          Materialize.toast('Creation failed!', 2000);
        }

        init();
        $scope.pfModel = {"createdAt": new Date()};
      });
  		// ref = new Firebase("https://yrma.firebaseio.com/");
  		// var usersRef = ref.child("putForward");
  		// var insert = $scope.pfModel;

  		// var date = insert.createdAt.getMonth() + "/" + insert.createdAt.getDate() + "/" + insert.createdAt.getFullYear();
  		// console.log(date);
  		// insert.createdAt = date;
  		// usersRef.push().set(insert);
  	};

	
	$scope.months = [
		{id: 1, mo: "January"},
		{id: 2,mo: "February"},
		{id: 3,mo: "March"},
		{id: 4,mo: "April"},
		{id: 5,mo: "May"},
		{id: 6,mo: "June"},
		{id: 7,mo: "July"},
		{id: 8,mo: "August"},
		{id: 9,mo: "September"},
		{id: 10,mo: "October"},
		{id: 11,mo: "November"},
		{id: 12,mo: "December"},
	];
  	
  }]);