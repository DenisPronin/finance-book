(function () {
    'use strict';

    var UserModule = angular.module('User', []);

    var App = angular.module('App', [
        'ngRoute',
        'User'
    ]).config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'book/partials/book'
        }).
        when('/book', {
            templateUrl: 'book/partials/book'
        }).
        otherwise({
            redirectTo: '/'
        });
    });

})();
