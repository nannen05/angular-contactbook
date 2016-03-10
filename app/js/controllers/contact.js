myApp.controller('ContactController', ['$scope', '$http', '$location', '$firebaseObject', '$routeParams', '$firebaseArray', 'FIREBASE_URL',
	function($scope, $http, $location, $firebaseObject, $routeParams, $firebaseArray, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL + '/contacts/' + $routeParams.cId );
	var contactSingle = $firebaseObject(ref);
	$scope.contact = contactSingle;

	$scope.contact.$loaded().then(function() {

		var latitude = $scope.contact.latitude;
		var longitude = $scope.contact.longitude;

		function mapInit() {

			var mapLocation = {
				"lat" : latitude,
				"lng" : longitude
			};

			var myLatlng = new google.maps.LatLng(mapLocation.lat, mapLocation.lng);
			var mapOptions = {
			  zoom: 12,
			  center: myLatlng
			};

			var map = new google.maps.Map(document.getElementById("map"), mapOptions);

			var marker = new google.maps.Marker({
			    position: myLatlng,
			    title:"Hello World!"
			});

			marker.setMap(map);
		};

		mapInit();  
	});
}]);