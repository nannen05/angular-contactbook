myApp.controller('EditContactController', ['$scope', '$http', '$location', '$firebaseObject', '$routeParams', '$firebaseArray', 'FIREBASE_URL',
	function($scope, $http, $location, $firebaseObject, $routeParams, $firebaseArray, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL + '/contacts/' + $routeParams.eId );
	var editcontactSingle = $firebaseObject(ref);
	$scope.editcontact = editcontactSingle;

	$scope.editcontact.$loaded().then(function() {

		$scope.updateContact = function() {

			if($scope.hideAddress = true) {
				$scope.editcontact.address = $scope.updateAddress.chosenPlace;
			} 

			$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + 
						$scope.editcontact.address).success(function(data){
						
			$scope.lat = data.results[0].geometry.location.lat;
			$scope.lng = data.results[0].geometry.location.lng;

				var updatedData = {
						firstname: $scope.editcontact.firstname,
						lastname: $scope.editcontact.lastname,
						email: $scope.editcontact.email,
						phone: $scope.editcontact.phone,
						address: $scope.editcontact.address,
						latitude: $scope.lat,
						longitude: $scope.lng,
						date: Firebase.ServerValue.TIMESTAMP
				};

				editcontactSingle.$save(updatedData).then(function(){
					var contactRoute = $routeParams.eId;
	 				$location.path('/contact/' + contactRoute);
	 			});
			});
		};

	});
}]);