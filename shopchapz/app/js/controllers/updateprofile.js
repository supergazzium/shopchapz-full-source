(function() {
    'use strict';

    var controllerId = 'updateprofile';

    angular
            .module('app')
            .controller(controllerId, updateprofile)
     updateprofile.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', 'loginRegisterService', '$mdDialog'];
    function updateprofile($rootScope, $scope, $timeout, $state, $location, loginRegisterService, $mdDialog) {

        var vm = this;
        vm.updationerror = false;
        vm.updationsuccess = false;
        vm.showProcessing = true;

        $scope.userId = localStorage.getItem('usersUserId');

        $scope.user = {
            user_id: $scope.userId,
            name: '',
            contact: '',
            address: '',
            country: '',
            state: '',
            city: ''
        }
   
        $scope.responseForUser = [];

    //////////////////////////////////////    Get update Profile data ////////////////////////////// 

         $scope.getProfileOfUser = function(){
            loginRegisterService.getProfileOfuser({user_id:$scope.userId}).success(function(response){
                if(response.status == 105 || response.status == '105'){
                    
                    $scope.user.name = response.data[0].name;
                    $scope.user.contact = response.data[0].contact;
                    $scope.user.address = response.data[0].address;
                    $scope.user.country = response.data[0].country;
                    $scope.user.state = response.data[0].state;
                    $scope.user.city = response.data[0].city;
                
                }
            })
         }


        $scope.getProfileOfUser();





   	   $scope.updateprofile = function(){
              console.log($scope.user);
              vm.showProcessing = false;
              loginRegisterService.updateprofile($scope.user).success(function(response){
                  console.log(response);
                if(response.status == 105 || response.status == '105'){
                    console.log("response updated");
                    vm.showProcessing = true;
                    vm.updationsuccess = true;
                    vm.showSuccess(response.data);
                }
                else{
                    vm.updationerror = true;
                    vm.showError(response.message);
                    console.log("error");
                }

              })
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