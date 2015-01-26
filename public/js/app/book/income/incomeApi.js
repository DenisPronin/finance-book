(function () {
    'use strict';

    angular.module('Book').service('incomeApi', ['$http', '$q', 'Time', 'bookService', function($http, $q, Time, bookService) {

        var me = this;
        var mode = 'income';
        var income = [];

        me.getIncome = function(){
            var deferred = $q.defer();

            bookService.getTableData(mode).then(function(income) {
                deferred.resolve(income);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        };

    }]);

})();
