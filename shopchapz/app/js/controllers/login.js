(function() {
    'use strict';

    var controllerId = 'login';

    angular
            .module('app')
            .controller(controllerId, login)
    login.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', 'loginRegisterService','$mdDialog','$auth'];
    function login($rootScope, $scope, $timeout, $state, $location, loginRegisterService, $mdDialog,$auth) {

        if (localStorage.getItem('loginStatus')) {
            $state.go('dashboard');
        }
        
        
        $scope.user = {
            'email': '',
            'password': ''
        }; 

        $scope.login = function() {
            // $location.path('/dashboard');
            //         localStorage.setItem('loginStatus', '1');
            loginRegisterService.login($scope.user).success(function(response) {
                console.log('response');
                console.log(response);
                if (response.status == 105 || response.status == '105') {
         
                    localStorage.setItem('loginStatus', response.data[0].access_token);
                    localStorage.setItem('usersUserId',response.data[0].user_id);
                    $state.go('dashboard');
                } 

                else if (response.status == 104 || response.status == '104' || response.status == 101 || response.status == '101') {
                    $mdDialog.show(
                            $mdDialog.alert()
                            .title('Message')
                            .textContent('e-mail id or password is incorrect')
                            .ok('close')
                            );
                }

                else if (response.status == 103 || response.status == '103') {
                    $mdDialog.show(
                            $mdDialog.alert()
                            .title('Message')
                            .textContent('This Email is not Registered with us!')
                            .ok('close')
                            );
                }

            });
        };


        //================= Start Social Media Login Integration =====================\\
       
       $scope.authenticate = function(provider) {
           $auth.authenticate(provider)
               .then(function(response) {
                  console.log(response);
                  if(response.data.status == 105 || response.data.status == '105'){
                    localStorage.setItem('loginStatus', response.data.data[0].access_token);
                    localStorage.setItem('usersUserId',response.data.data[0].user_id);
                    $state.go('dashboard');
                  }

               })
       };
       //================= End Social Media Login Integration =====================\\

    }
})();
