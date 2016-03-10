myApp.controller('AddContactController', ['$scope', '$http', function($scope, $http){

	$scope.message = "Works";

	$scope.addContact = function() {
		$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.contact.chosenPlace).success(function(){
			console.log(data);
		});
	};

}]);