(function () {
    'use strict';

    var controllerId = 'updatepassword';

    angular
        .module('app')
        .controller(controllerId, updatepassword)
        updatepassword.$inject = ['$rootScope', '$scope', '$timeout', '$state', 'loginSignupService', '$location', '$mdDialog'];
    function updatepassword($rootScope, $scope, $timeout, $state, loginSignupService, $location, $mdDialog) {

        var vm = this;

        var url = window.location.href;
        var vars = [];
        var vars = url.split("?");
        var token = vars[1];
        console.log(token);

        vm.wrongEmail = false;

        $scope.user = {
            'password': '',
            'cPassword' : ''
        }

        $scope.updatePasswordData = {
            new_password: '',
            verification_token: token
        };
       

        $scope.updatePassword = function () {
            
      console.log($scope.updatePasswordData);
                         var newPassword = $scope.user.password;
                 var confirmPassword = $scope.user.cPassword;
      
                 if (newPassword == "" || newPassword == "null" || newPassword == null) {
                    vm.showerror = true;
                     vm.showError("New password is required");
                     return false;
                 } else if (confirmPassword == "" || confirmPassword == "null" || confirmPassword == null) {
                     console.log("passit "+ confirmPassword + newPassword );
                    vm.showerror = true;
                     vm.showError("Confirm password is required");
                     return false;
                 } else if (confirmPassword != newPassword) {
                     console.log("confirm");
                    vm.showerror = true;
                     vm.showError("New password does not match the confirm password");
                     return false;
                 }
                 $scope.updatePasswordData.new_password =  $scope.user.password;  
                 console.log($scope.updatePasswordData);
            //    vm.updateProcessing = true;
             loginSignupService.updatePassword($scope.updatePasswordData).then(function (response) {
                //  vm.updateProcessing = false;
                  localStorage.clear();
                 console.log(response)
                 if (response.data.status == 105 || response.data.status == "105") {
                    vm.showsuccess = true;
                    vm.showSuccess("Password updated successfully, please login...");
      
                     $timeout(function () {
                 location.path("/login");
             }, 4000)
                   
      
                 } else {
                     vm.showError(response.data.message);
                 }
      
             })
         };


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