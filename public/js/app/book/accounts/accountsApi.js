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

    }]);

})();
