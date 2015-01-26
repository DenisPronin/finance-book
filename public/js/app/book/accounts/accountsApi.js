(function () {
    'use strict';

    angular.module('Book').service('accountsApi', ['$http', '$q', 'Time', 'bookService', function($http, $q, Time, bookService) {

        var me = this;
        var mode = 'accounts';

        var accounts = [];

        me.getAccounts = function(){
            var deferred = $q.defer();

            bookService.getTableData(mode).then(function(accounts) {
                deferred.resolve(accounts);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        };

        me.addAccount = function(newAccount) {
            var deferred = $q.defer();
            var month = Time.getMonth();
            var year = Time.getYear();

            newAccount.month_id = month.id;
            newAccount.year = year;
            newAccount.currency_id = 2;
            $http.put('/accounts/add', newAccount)
                .success(function(account) {
                    if(!account && !account.ok) {
                        deferred.reject();
                    }
                    deferred.resolve(newAccount);
                }).
                error(function() {
                    console.log('Account don\'t added!');
                    deferred.reject();
                });


            return deferred.promise;
        };

    }]);

})();
