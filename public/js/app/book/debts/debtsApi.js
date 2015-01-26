(function () {
    'use strict';

    angular.module('Book').service('debtsApi', ['$http', '$q', 'Time', 'bookService', function($http, $q, Time, bookService) {

        var me = this;
        var mode = 'debts';

        var debts = [];

        me.getDebts = function(){
            var deferred = $q.defer();

            bookService.getTableData(mode).then(function(debts) {
                debts.forEach(function(debt) {
                    var deadline = moment(debt.deadline);
                    debt.deadline = deadline.format('DD/MM/YYYY');
                });
                deferred.resolve(debts);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        };

    }]);

})();
