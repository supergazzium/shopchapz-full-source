(function () {
    'use strict';

    var controllerId = 'signup';

    angular
        .module('app')
        .controller(controllerId, signup)
    signup.$inject = ['$rootScope', '$scope', '$timeout', '$state', '$location', '$mdDialog'];
    function signup($rootScope, $scope, $timeout, $state, $location, $mdDialog) {



    }
})();