(function () {
    'use strict';

    var UserModule = angular.module('User', []);
    var BookModule = angular.module('Book', []);

    var App = angular.module('App', [
        'ngRoute',
        'User',
        'Book'
    ]);

})();
