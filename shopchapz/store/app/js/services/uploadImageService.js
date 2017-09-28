(function () {
    'use strict';

    var serviceId = 'uploadImageService';

    angular
        .module('app')
        .factory(serviceId, uploadImageService)
    uploadImageService.$inject = ['$http'];
    function uploadImageService($http) {
        var service = this;
        service.uploadFileToUrl = uploadFileToUrl;

        return service;
        function uploadFileToUrl(file) {
            var fd = new FormData();
            fd.append('upload_image', file);
            
            return $http.post(config.appSettings.serviceUrl + 'upload_image', fd, {
                headers: {
                    'Content-Type': undefined
                },
            });

        }
    }
})();