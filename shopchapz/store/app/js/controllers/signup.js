(function () {
    'use strict';

    var controllerId = 'signup';

    angular
        .module('app')
        .controller(controllerId, signup)
    signup.$inject = ['$rootScope', '$scope', '$timeout', '$state','loginSignupService', '$location', '$mdDialog'];
    function signup($rootScope, $scope, $timeout, $state,loginSignupService, $location, $mdDialog) {

        var vm = this;

       
        vm.alreadyregistered = false;
        vm.registeredSuccessfully = false;
        vm.showProcessing = true;
      

        $scope.user = {
            'email': '',
            'password': '',
            'store_name': '',
            'id': '',
            'owner_phone_number': ''
        };

        $scope.signup = function(){
            console.log("signup");
            vm.showProcessing = false;
            console.log($scope.user);
            loginSignupService.signup($scope.user).success(function(response) {
                console.log('response from Register');
                console.log(response);

                if (response.status == 105 || response.status == '105') {
                    console.log("signup success");
                    vm.registeredSuccessfully = true;
                    vm.showSuccess("Registered successfully, please wait...");
                    $timeout(function() {
                        $state.go('login');
                    }, 2000);

                }
                else {
                    console.log("wrong");
                    vm.showProcessing = true;
                    vm.alreadyregistered = true;
                    vm.showError(response.message);
                   
                   
                    }


            });

        }

        vm.showError = showError;
        vm.showSuccess = showSuccess;

        function showError(message) {
            $(".alert-danger").html(message).show();
            $timeout(function () {
                $(".alert-danger").html("").hide();
            }, 4000)
        }

        function showSuccess(message) {
            $(".alert-success").html(message).show();
            $timeout(function () {
                $(".alert-success").html("").hide();
            }, 4000)
        }

    }
})();