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
        service.forgot = forgot;
        service.newpassword = newpassword;
        service.getlistofstores = getlistofstores;
        service.getlistofusers = getlistofusers;
        service.getStoreDetails = getStoreDetails;
        service.editprofile = editprofile;
        service.deleteitemfromDB = deleteitemfromDB;
        service.updatePassword = updatePassword;
        service.activateStore = activateStore;
        service.deactivateStore = deactivateStore;
        service.getratingandreviews = getratingandreviews;
        service.deleteStoreFromDB = deleteStoreFromDB;
        service.deleteUserFromDB = deleteUserFromDB;
        
        
        return service;

        function login(data) {
            return $http.post(config.appSettings.serviceUrl + 'super_admin_login', data);
        }

        function forgot(data) {
            return $http.post(config.appSettings.serviceUrl + 'forgot_password', data);
        }
        function newpassword(data) {
            return $http.post(config.appSettings.serviceUrl + 'change_password', data);
        }
        function getlistofstores() {
            return $http.post(config.appSettings.serviceUrl + 'list_of_all_stores');
        }
        function getlistofusers(data) {
            return $http.post(config.appSettings.serviceUrl + 'all_users',data);
        }
        function getStoreDetails(data) {
            return $http.post(config.appSettings.serviceUrl + 'get_store_details',data);
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
        function activateStore(data) {
            return $http.post(config.appSettings.serviceUrl + 'active_inactive_store', data);
        }
        function deactivateStore(data) {
            return $http.post(config.appSettings.serviceUrl + 'active_inactive_store', data);
        }
        function getratingandreviews(data) {
            return $http.post(config.appSettings.serviceUrl + 'get_rating_and_comment', data);
        }
        function deleteStoreFromDB(data) {
            return $http.post(config.appSettings.serviceUrl + 'delete', data);
        }
        function deleteUserFromDB(data) {
            return $http.post(config.appSettings.serviceUrl + 'delete', data);
        }

    }
})();