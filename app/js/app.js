var myApp = angular.module('myApp', ['ngRoute', 'firebase'])
	.constant('FIREBASE_URL', 'https://angcontact05.firebaseio.com/');

myApp.config(['$routeProvider', function($routeProvider){

	$routeProvider
		.when('/', {
			templateUrl: 'views/contacts.html',
			controller: 'AddContactController'
		})
		.when('/add', {
			templateUrl: 'views/add.html',
			controller: 'AddContactController'
		})
		.when('/contact/:cId' , {
			templateUrl: 'views/single-contact.html',
			controller: 'ContactController'
		})
		

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


