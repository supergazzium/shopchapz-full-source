(function() {
    'use strict';

    var controllerId = 'contact';

    angular
            .module('app')
            .controller(controllerId, contact)
            contact.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', 'loginRegisterService', '$mdDialog'];
    function contact($rootScope, $scope, $timeout, $state, $location, loginRegisterService, $mdDialog) {

        var vm = this;
        vm.updationerror = false;
        vm.updationsuccess = false;
        vm.showProcessing = true;

       

        $scope.user = {
            name: '',
            email: '',
            contact: '',
            message: ''
            
        }
   
   	  $scope.contactUs = function(){
        vm.showProcessing = false;
             console.log($scope.user);
             loginRegisterService.contactUs($scope.user).success(function(response){
                 console.log(response);
                 if(response.status == 105 || response.status == '105'){
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