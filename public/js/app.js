'use strict';

var app = angular.module('App', ['ngRoute']).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'book/partials/book'
            }).
            when('/book', {
                templateUrl: 'book/partials/book'
            }).
            otherwise({
                redirectTo: '/'
            });
    });