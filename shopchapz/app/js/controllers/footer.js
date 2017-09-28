(function() {
    'use strict';

    var controllerId = 'footer';

    angular
            .module('app')
            .controller(controllerId, footer)
    footer.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location','$mdDialog'];
    function footer($rootScope, $scope, $timeout, $state, $location, $mdDialog) {
   

 		$scope.loginStatus = false;
 		if(localStorage.getItem('loginStatus') == 1) {
 			$scope.loginStatus = true;
 		}        
    }

})();
