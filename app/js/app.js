var myApp = angular.module('myApp', []);

myApp.config(['$routeProvider', function($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl: 'views/contact.html',
			controller: 'ContactController'
		})

}])

myApp.controller('ContactController', ['$scope', '$http', function($scope, $http){

	$http.get('js/data.json').success(function(data) {
		$scope.contacts = data;
	});

}]);