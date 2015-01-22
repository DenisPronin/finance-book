(function () {
    'use strict';

    angular.module('User').service('UserApi', ['$http', '$q', function($http, $q) {

        var user = {};

        var setUserName = function(_name) {
            user.name = _name || '';
        };

        var setUserEmail = function(_email) {
            user.email = _email || '';
        };

        this.getUserData = function() {
            var deferred = $q.defer();

            $http.get('/book/getUser').
                success(function(data) {
                    if(!data) {
                        return false;
                    }
                    setUserName(data.name);
                    setUserEmail(data.email);
                    deferred.resolve(user);
                }).
                error(function(data) {
                    console.log('You are not authorized!');
                    deferred.reject();
                });

            return deferred.promise;
        }

    }]);

})();
