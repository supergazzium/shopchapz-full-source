(function () {
    'use strict';

    var controllerId = 'register';

    angular
        .module('app')
        .controller(controllerId, register)
    register.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', 'loginRegisterService', '$mdDialog','$auth'];
    function register($rootScope, $scope, $timeout, $state, $location, loginRegisterService, $mdDialog,$auth) {
        $scope.newUser = {
            'name': '',
            'email': '',
            'password': '',
            'contact': ''
        };

        $scope.register = function () {
            loginRegisterService.register($scope.newUser).success(function (response) {
                console.log('response');
                console.log(response);

                if (response.status == 105 || response.status == '105') {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Message')
                            .textContent('You successfully Registerd, Please Login to continue')
                            .ok('close')
                    );

                    $location.path('/login');
                }

                else if (response.status == 103 || response.status == '103') {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .title('Message')
                            .textContent('You are already registered with us, Please login to enjoy the services')
                            .ok('close')
                    );
                }
            });
        }

        //================= Start Social Media Login Integration =====================\\

        $scope.authenticate = function (provider) {
            $auth.authenticate(provider)
                .then(function (response) {
                    console.log(response);
                    if (response.data.status == 105 || response.data.status == '105') {
                        localStorage.setItem('loginStatus', response.data.data[0].access_token);
                        localStorage.setItem('usersUserId', response.data.data[0].user_id);
                        $state.go('dashboard');
                    }

                })
        };
        //================= End Social Media Login Integration =====================\\


    }
})();
