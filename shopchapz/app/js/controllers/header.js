(function() {
    'use strict';

    var controllerId = 'header';

    angular
            .module('app')
            .controller(controllerId, header)
    header.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', 'loginRegisterService', '$mdDialog'];
    function header($rootScope, $scope, $timeout, $state, $location, loginRegisterService, $mdDialog) {
   
   	    // check wether the user is loged in or logedout
 		$scope.loginStatus = false;
 		if(localStorage.getItem('loginStatus')) {
             $scope.loginStatus = true;
 		}

 		$scope.logout = function() {
            localStorage.removeItem("loginStatus");
            $scope.loginStatus = false;
            // $location.path('/login');
            
 			 			
         }
         
           ////////////////////////////////////// Search function /////////////////////////////


        $scope.searchValue = '';
        $scope.searchValueCall = function () {
            console.log("calleld");
            $rootScope.searchedValue = $scope.searchValue;
            if ($scope.searchValue != '' && $scope.searchValue != null) {
                console.log($state.current.url);
              if($state.current.url == '/search-results'){
                  $state.go("search-results");
                  $state.reload();
              }
              else{
                $state.go("search-results");
              }
                // 
               
            }
        }

        $scope.searchStore = '';
        $rootScope.searchStore1 = $scope.searchStore;

        // console.log($rootScope.searchStore);
    }

})();
