'use strict';

angular.module('putForwardReport', ['ngRoute'])



.controller('PfReportController', ['$http', '$scope', 'FirebaseService',
  function ($http, $scope, FirebaseService) {
  
	var today = new Date();
	$scope.selectedMonth = today.getMonth() + 1;
    
  	$scope.deleteRecord = function(id){
  		ref = new Firebase("https://yrma.firebaseio.com/putForward/"+id);
  		ref.remove();
  	}
  	
	$scope.monthChange = function(selectedMonth){
		FirebaseService.all("putForward").then(function(response){

		
		  _.remove(response, function(n){ 
			  var createdDate = new Date(n.createdAt);
			  return selectedMonth != createdDate.getMonth()+1 && createdDate.getFullYear() == today.getFullYear(); });
			  
		 $scope.totalPutfoward = response.length;
		// _.forOwn(response, function (value, key) {
			// if(value.personId){
				// sorted.push(value.personId)
			// }
        // });
		// sorted.sort();
		
		var result = _.groupBy(response, 'personId');
		console.log();
		console.log(result);
		$scope.reports = result;
	 });
	 
	 
		
	};
	
	
	// var countperuser;
	// function CalculatedAccumulatedGC(){
		// var accumulatedGC = 0;
		// FirebaseService.all("putForward").then(function(response){
						
			// for(var x=0;x <= today.getMonth(); x++){
			
					// var monthData = response.filter(function(res){
						// var createdDate = new Date(res.createdAt);
						// return createdDate.getMonth() == x && createdDate.getFullYear() == today.getFullYear();
					// });				
					  				  
				
				
				 // var result = _.groupBy(monthData, 'personId');
				  
					// console.log(result);
					// countperuser = result;
					// setTimeout(function(){
						// for(var y=0;y <= today.getMonth(); y++){
							// $scope.accumullatedGC = $scope.accumullatedGC + $scope.getGcCountPerMonth(result.count, monthData.length);
						// }
					// },0);
				 
					 
			// }
		// });
	// }
	
	
	
	$scope.getGcCountPerMonth = function(putForwardCount, totalPutforward){
		
		var cc = putForwardCount * (50/totalPutforward);
		console.log(cc,putForwardCount,totalPutforward)
		cc = cc > putForwardCount * 5 ?  putForwardCount * 5 : cc.fixed(0); 
		return cc;
	}
	
	$scope.gcCount = function(putForwardCount){
		
		var result = putForwardCount * (50/$scope.totalPutfoward);
		result = result > putForwardCount * 5 ?  putForwardCount * 5 : result.fixed(0); 
		return result;
	}
	
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