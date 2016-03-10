myApp.controller('AddContactController', ['$scope', '$http', '$location', '$firebaseObject', '$routeParams', '$firebaseArray', 'FIREBASE_URL',
	function($scope, $http, $location, $firebaseObject, $routeParams, $firebaseArray, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL + '/contacts');

	$scope.lat = '';
	$scope.lng = '';

	$scope.addContact = function() {

		var contactInfo = $firebaseArray(ref);

		$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + $scope.contact.chosenPlace).success(function(data){
						
			$scope.lat = data.results[0].geometry.location.lat;
			$scope.lng = data.results[0].geometry.location.lng;

			var myData = {
 				firstname: $scope.contact.firstname,
 				lastname: $scope.contact.lastname,
 				email: $scope.contact.email,
 				address: $scope.contact.chosenPlace,
 				latitude: $scope.lat,
 				longitude: $scope.lng,
 				phone: $scope.contact.phone,
 				date: Firebase.ServerValue.TIMESTAMP
 			};

 			contactInfo.$add(myData).then(function(){
 				console.log("data added");
 			});

		});
	};

}]);