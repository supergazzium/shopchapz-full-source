(function() {
    'use strict';

    var serviceId = 'loginRegisterService';

    angular
            .module('app')
            .factory(serviceId, loginRegisterService)
        loginRegisterService.$inject = ['$http'];
    function loginRegisterService($http) {
        var service = this;
        service.login = login;
        service.register = register;
        service.logout = logout;
        service.forgotPass = forgotPass;
        service.changepassword =  changepassword;
        service.updatePassword =  updatePassword;
        service.updateprofile = updateprofile;
        service.contactUs = contactUs;
        service.getlistofstores = getlistofstores;
        service.getstoredetails = getstoredetails;
        service.submitRatings = submitRatings;
        service.submitComments = submitComments;
        service.getRatingsAndComments = getRatingsAndComments;
        service.addClicks = addClicks;
        service.getProfileOfuser = getProfileOfuser;
       
        

        return service;

        function login(data) {
            return $http.post(config.appSettings.serviceUrl + 'user_login', data);
        }

        function register(data) {
            return $http.post(config.appSettings.serviceUrl + 'user_signup', data);
        }

        function logout(data) {
            return $http.post(config.appSettings.serviceUrl + 'user_logout', data);
        }
        function forgotPass(data) {
            return $http.post(config.appSettings.serviceUrl + 'forgot_password', data);
        }
        function changepassword(data) {
            return $http.post(config.appSettings.serviceUrl + 'change_password', data);
        }
        function updatePassword(data) {
            return $http.post(config.appSettings.serviceUrl + 'update_password', data);
        }
        function updateprofile(data) {
            return $http.post(config.appSettings.serviceUrl + 'update_profile', data);
        }
        function contactUs(data) {
            return $http.post(config.appSettings.serviceUrl + 'contact_us', data);
        }
        function getlistofstores() {
            return $http.post(config.appSettings.serviceUrl + 'list_of_all_stores');
        }
        function getstoredetails(data) {
            return $http.post(config.appSettings.serviceUrl + 'get_store_details', data);
        }
        function submitRatings(data) {
            return $http.post(config.appSettings.serviceUrl + 'ratings', data);
        }
        function submitComments(data) {
            return $http.post(config.appSettings.serviceUrl + 'comments', data);
        }
        function getRatingsAndComments(data) {
            return $http.post(config.appSettings.serviceUrl + 'get_rating_and_comment', data);
        }
        function addClicks(data) {
            return $http.post(config.appSettings.serviceUrl + 'clicks', data);
        }
        function getProfileOfuser(data) {
            return $http.post(config.appSettings.serviceUrl + 'get_user_details', data);
        }
    }
})();
