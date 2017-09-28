(function() {
    'use strict';

    var controllerId = 'forgotpassword';

    angular
            .module('app')
            .controller(controllerId, forgotpassword)
            forgotpassword.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', 'loginRegisterService', '$mdDialog'];
    function forgotpassword($rootScope, $scope, $timeout, $state, $location, loginRegisterService, $mdDialog) {

        $scope.user = {
            
            'email':''
            
        };

        $scope.forgot = function(){
            console.log($scope.user);
            loginRegisterService.forgotPass($scope.user).success(function(response){

                if(response.status == 105 || response.data == "105"){

                    console.log(response);
                    $mdDialog.show(
                        $mdDialog.alert()
                        .title('Message')
                        .textContent('Mail has been Sent to your Registered mail, Please Login to continue')
                        .ok('close')
                        );

                $location.path('/login');
                }
                else{
                    console.log("failed");
                }

            })
        }

        

    }
})();