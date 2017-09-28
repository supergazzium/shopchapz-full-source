
(function () {
    'use strict';

    var controllerId = 'login';

    angular
        .module('app')
        .controller(controllerId, login)
    login.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', '$mdDialog','loginSignupService'];
    function login($rootScope, $scope, $timeout, $state, $location, $mdDialog,loginSignupService) {

        if (localStorage.getItem("superadmintoken")) {
            $state.go("home");
        }
        var vm = this;



        vm.wrongCredentials = false;
        vm.showProcessing = true;

        $scope.user = {
            'email': '',
            'password': ''
        };

        $scope.login = function () {
            console.log("login");
            vm.showProcessing = false;
            console.log($scope.user);

            loginSignupService.login($scope.user).success(function (response) {

                if (response.status == 105 || response.status == "105") {
                    
                    console.log('response from login');
                    console.log(response);
                    localStorage.setItem("superadmintoken", response.data.access_token);
                    // localStorage.setItem("store", response.data.store.store_id);
                    // console.log(response.data.user.access_token);
                    // console.log(response.data.store.store_id);
                    $timeout(function() {
                        $state.go('home');
                    }, 2000);

                }
                else {
                    console.log("wrong email and pass");
                    vm.showProcessing = true;
                    vm.wrongCredentials = true;
                    vm.showError("Wrong Email or Password");
                }

                // get the logined user data in the rootscope


            });
        }

        vm.showError = showError;
        function showError(message) {
            $(".alert-danger").html(message).show();
            $timeout(function () {
                $(".alert-danger").html("").hide();
            }, 4000)
        }

    }
})();