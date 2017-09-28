(function () {
    'use strict';

    var controllerId = 'forgot';

    angular
        .module('app')
        .controller(controllerId, forgot)
    forgot.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', '$mdDialog','loginSignupService'];
    function forgot($rootScope, $scope, $timeout, $state, $location, $mdDialog,loginSignupService) {

        var vm = this;

        vm.wrongEmail = false;

        $scope.user = {
            'email': ''
        }

        $scope.forgotpass = function () {
            console.log("forgot");
            loginSignupService.forgot($scope.user).success(function (response) {

                if (response.status == 105 || response.status == "105") {
                    console.log('response from forgot');
                    console.log(response);
                    vm.sentSuccessfully = true;
                    vm.showSuccess("Link Sent to your Email Id");
                    // $timeout(function() {
                       
                    // }, 4000);
                }
                else {
                    console.log("wrong email");
                    vm.wrongEmail = true;
                    vm.showError("User not Registered");
                }

                // get the logined user data in the rootscope


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