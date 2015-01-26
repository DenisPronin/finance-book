(function () {
    'use strict';

    angular.module('Book').service('accountsApi', ['$http', '$q', 'Time', function($http, $q, Time) {

        var me = this;
        var accounts = [];

        me.getAccounts = function(){
            var deferred = $q.defer();
            var month = Time.getMonth();
            var year = Time.getYear();

            $http.get('/accounts/' + month.id + '/' + year).
                success(function(accounts) {
                    if(!accounts) {
                        deferred.reject();
                    }
                    deferred.resolve(accounts);
                }).
                error(function() {
                    console.log('You are not authorized!');
                    deferred.reject();
                });

            return deferred.promise;
        };

    }]);

})();
