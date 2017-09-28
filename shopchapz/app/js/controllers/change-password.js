(function() {
    'use strict';

    var controllerId = 'changepassword';

    angular
            .module('app')
            .controller(controllerId, changepassword)
            changepassword.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', 'loginRegisterService', '$mdDialog'];
    function changepassword($rootScope, $scope, $timeout, $state, $location, loginRegisterService, $mdDialog) {

        var token = localStorage.getItem('loginStatus');

        $scope.user = {
            
            'old_password': '',
            'new_password': '',
            'access_token' : token
            
        };

        $scope.changepassword = function(){
            console.log($scope.user);
            loginRegisterService.changepassword($scope.user).success(function(response){

                if(response.status == 105 || response.data == "105"){

                    console.log(response);
                    $mdDialog.show(
                        $mdDialog.alert()
                        .title('Message')
                        .textContent('Your Password has been changed')
                        .ok('close')
                        );

                }
                else{
                    $mdDialog.show(
                        $mdDialog.alert()
                        .title('Message')
                        .textContent('Old Password did not matched')
                        .ok('close')
                        );
                }

            })
        }

        

    }
})();