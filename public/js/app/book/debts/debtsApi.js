(function () {
    'use strict';

    angular.module('Book').service('debtsApi', ['$http', '$q', 'Time', 'bookService', 'statusApi', function($http, $q, Time, bookService, statusApi) {

        var me = this;
        var mode = 'debts';

        me.get = function(){
            var deferred = $q.defer();

            bookService.getTableData(mode).then(function(debts) {
                debts.forEach(function(debt) {
                    var date =  moment(debt.deadline);
                    debt.deadline = date.format('DD/MM/YYYY');
                });
                deferred.resolve(debts);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        };

        me.add = function(newDebt) {
            newDebt.status_id = statusApi.getDefaultStatus().id;
            return bookService.addRow(newDebt, mode);
        };

        me.deleteRow = function(debtId) {
            return bookService.deleteRow(debtId, mode);
        };

        me.edit = function(debt) {
            return bookService.editRow(debt, mode);
        };

    }]);

})();
