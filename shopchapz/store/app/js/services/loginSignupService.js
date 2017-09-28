(function () {
    'use strict';

    var serviceId = 'loginSignupService';

    angular
        .module('app')
        .factory(serviceId, loginSignupService)
    loginSignupService.$inject = ['$http'];
    function loginSignupService($http) {
        var service = this;
        service.login = login;
        service.signup = signup;
        service.forgot = forgot;
        service.newpassword = newpassword;
        service.getStoreDetails = getStoreDetails;
        service.editprofile = editprofile;
        service.deleteitemfromDB = deleteitemfromDB;
        service.updatePassword = updatePassword;
        service.getratingandreviews = getratingandreviews;
        
        
        return service;

        function login(data) {
            return $http.post(config.appSettings.serviceUrl + 'admin_login', data);
        }

        function signup(data) {
            return $http.post(config.appSettings.serviceUrl + 'signup', data);
        }
        function forgot(data) {
            return $http.post(config.appSettings.serviceUrl + 'forgot_password', data);
        }
        function newpassword(data) {
            return $http.post(config.appSettings.serviceUrl + 'change_password', data);
        }
        function getStoreDetails(data) {
            return $http.post(config.appSettings.serviceUrl + 'get_store_details', data);
        }
        function editprofile(data) {
            return $http.post(config.appSettings.serviceUrl + 'edit_profile', data);
        }
        function deleteitemfromDB(data) {
            return $http.post(config.appSettings.serviceUrl + 'delete_image', data);
        }
        function updatePassword(data) {
            return $http.post(config.appSettings.serviceUrl + 'update_password', data);
        }
        function getratingandreviews(data) {
            return $http.post(config.appSettings.serviceUrl + 'get_rating_and_comment', data);
        }

    }
})();