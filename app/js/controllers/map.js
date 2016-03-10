myApp.controller('MapController', ['$scope', '$http', '$location', '$firebaseObject', '$routeParams', '$firebaseArray', 'FIREBASE_URL',
	function($scope, $http, $location, $firebaseObject, $routeParams, $firebaseArray, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL + '/contacts');
	var mapList = $firebaseArray(ref);
	console.log(mapList)
	$scope.maps = mapList;

	$scope.maps.$loaded().then(function() {

	    var map = new google.maps.Map(document.getElementById('allMap'), {
	      zoom: 10,
	      center: new google.maps.LatLng($scope.maps[0].latitude, $scope.maps[0].longitude),
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    });

	    var infowindow = new google.maps.InfoWindow();

	    var marker, i;

	    for (i = 0; i < $scope.maps.length; i++) {  
	      marker = new google.maps.Marker({
	        position: new google.maps.LatLng($scope.maps[i].latitude, $scope.maps[i].longitude),
	        map: map
	      });

	      var contentString = '<div id="content">'+
				      '<div id="siteNotice">'+
				      '</div>'+
				      '<h4 id="firstHeading" class="firstHeading">' + $scope.maps[i].firstname + " " + $scope.maps[i].lastname + '</h4>'+
				      '<a class="text-center" href="#/contact/' + $scope.maps[i].$id + '">View More</a>' +
				      '</div>';
		  console.log(contentString);
	      google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        return function() {
	          infowindow.setContent(contentString);
	          infowindow.open(map, marker);
	        }
	      })(marker, i));
	    };
	});    

}]);