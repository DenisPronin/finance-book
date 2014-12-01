'use strict';

var app = angular.module('App', ['ngRoute']).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/view1'
            }).
            when('/view1', {
                templateUrl: 'partials/view2'
            }).
            otherwise({
                redirectTo: '/'
            });
    });