(function () {
    'use strict';

    angular.module('Book').service('accountsApi', ['$http', '$q', 'Time', 'bookService', function($http, $q, Time, bookService) {

        var me = this;
        var mode = 'accounts';

        var accounts = [];

        me.get = function(){
            var deferred = $q.defer();

            bookService.getTableData(mode).then(function(accounts) {
                deferred.resolve(accounts);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        };

        me.add = function(newAccount) {
            var deferred = $q.defer();
            var month = Time.getMonth();
            var year = Time.getYear();

            newAccount.month_id = month.id;
            newAccount.year = year;
            $http.put('/accounts/add', newAccount)
                .success(function(account) {
                    if(!account && !account.ok) {
                        deferred.reject();
                    }
                    deferred.resolve(account.id);
                }).
                error(function() {
                    console.log('Account don\'t added!');
                    deferred.reject();
                });

            return deferred.promise;
        };

        me.delete = function(accountId) {
            var deferred = $q.defer();

            $http.delete('/accounts/' + accountId)
                .success(function(data) {
                    if(!data && !data.ok) {
                        deferred.reject();
                    }
                    deferred.resolve();
                }).
                error(function() {
                    console.log('Account don\'t removed!');
                    deferred.reject();
                });

            return deferred.promise;
        };

        me.edit = function(account) {
            var deferred = $q.defer();

            var month = Time.getMonth();
            var year = Time.getYear();

            account.month_id = month.id;
            account.year = year;

            $http.post('/accounts/edit', account)
                .success(function(data) {
                    if(!data && !data.ok) {
                        deferred.reject();
                    }
                    deferred.resolve(account.id);
                }).
                error(function() {
                    console.log('Account don\'t edited!');
                    deferred.reject();
                });

            return deferred.promise;
        };

    }]);

})();
