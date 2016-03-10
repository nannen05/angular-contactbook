var myApp = angular.module('myApp', ['ngRoute', 'firebase'])
	.constant('FIREBASE_URL', 'https://angcontact05.firebaseio.com/');

myApp.config(['$routeProvider', function($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl: 'views/contacts.html',
			controller: 'ContactController'
		})
		.when('/ContactID' , {
			templateUrl: 'views/single-contact.html',
			controller: 'ContactController'
		})
		.when('/add', {
			templateUrl: 'views/add.html',
			controller: 'AddContactController'
		})

}]);

myApp.controller('ContactController', ['$scope', '$http', function($scope, $http){

	$http.get('js/data.json').success(function(data) {
		$scope.contacts = data;
	});

}]);

myApp.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: []
                //componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});


