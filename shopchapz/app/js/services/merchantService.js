(function() {
    'use strict';

    var serviceId = 'merchantService';

    angular
            .module('app')
            .factory(serviceId, merchantService)
        merchantService.$inject = ['$http'];
    function merchantService($http) {
        var service = this;
        service.merchants = merchants;
        
        return service;

        function merchants() {
            console.log('merchantService');
            return $http.post(config.appSettings.serviceUrl + 'all_merchants');
        }
    }
})();
