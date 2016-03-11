myApp.controller('EditContactController', ['$scope', '$http', '$location', '$firebaseObject', '$routeParams', '$firebaseArray', 'FIREBASE_URL',
	function($scope, $http, $location, $firebaseObject, $routeParams, $firebaseArray, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL + '/contacts/' + $routeParams.eId );
	var editcontactSingle = $firebaseObject(ref);
	$scope.editcontact = editcontactSingle;

	$scope.editcontact.$loaded().then(function() {

		$scope.updateContact = function() {

			$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + 
						$scope.updatecontact.chosenPlace).success(function(data){
						
			$scope.lat = data.results[0].geometry.location.lat;
			$scope.lng = data.results[0].geometry.location.lng;

				var updatedData = {
						firstname: $scope.editcontact.firstname,
						lastname: $scope.updatecontact.lastname,
						email: $scope.updatecontact.email,
						phone: $scope.updatecontact.phone,
						address: $scope.updatecontact.chosenPlace,
						latitude: $scope.lat,
						longitude: $scope.lng,
						date: Firebase.ServerValue.TIMESTAMP
				};

				console.log(updatedData);

				// editcontactSingle.update(updatedData).then(function(){
	 		// 		$location.path('/contact/' + $routeParams.eid);
	 		// 	});
			});
		};

	});
}]);