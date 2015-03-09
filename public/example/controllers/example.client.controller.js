'use strict';
// Used the module() method to retrieve 'example', then used
// controller method to create a new ExampleController constructor
// f'n.  Applied the dependency injection to inject $scope object
// Finally you used the $scope object to define a name property.
// Injected the authentication service to the controller and 
// used it to reference the model name field to the user fullName
// field.
angular.module('example').controller('ExampleController', ['$scope', 'Authentication', function($scope, Authentication) {
		// allows view to fully use the Authentication service
		$scope.authentication = Authentication;
	}
]);