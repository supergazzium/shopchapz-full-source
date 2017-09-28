
'use strict';

var app = angular.module('app', [
   'ngAnimate', // animations
 'ngResource', // Rest
//    'ngSanitize', // sanitizes html bindings (ex: sidebar.js)
    'ui.router', // UI Router
    'ngStorage', // Local Storage
//    'angularSpinner',
    'ngMaterial',
    'ngMessages',
    'datatables',
    'satellizer',
    'djds4rce.angular-socialshare'
    
    // '$authProvider'
//        'rzModule',

//        'nvd3ChartDirectives',
    // 3rd Party Modules
//    'ui.bootstrap', // ui-bootstrap (ex: carousel, pagination, dialog)
//        'angularSelectbox',
//    'ui.grid',
//    'ngImgCrop',
//    'ImageCropper',
//    'djds4rce.angular-socialshare',
//    'satellizer',
//    'ngAutocomplete'


])
       .run(function($FB) {
   $FB.init('474822239568942');
   // Timeout timer value
 

});
