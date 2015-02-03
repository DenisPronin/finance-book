(function () {
    'use strict';

    angular.module('Book').service('incomeApi', ['$http', '$q', 'Time', 'bookService', 'statusApi', function($http, $q, Time, bookService, statusApi) {

        var me = this;
        var mode = 'income';
        var income = [];

        me.get = function(){
            var deferred = $q.defer();

            bookService.getTableData(mode).then(function(income) {
                income.forEach(function(_income) {
                    var date =  moment().set({'year': _income.year, 'month': _income.month_id, date: _income.day});
                    _income.date = date.format('DD/MM/YYYY');
                });
                deferred.resolve(income);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        };

        me.add = function(newIncome) {
            delete newIncome.order_num;
            var date = Time.splitDate(newIncome.date);
            newIncome.day = date.day;
            newIncome.month = date.month;
            newIncome.year = date.year;
            newIncome.status_id = statusApi.getDefaultStatus().id;
            return bookService.addRow(newIncome, mode);

        };

        me.deleteRow = function(incomeId) {
            return bookService.deleteRow(incomeId, mode);
        };

        me.edit = function(income) {
            var date = Time.splitDate(income.date);
            income.day = date.day;
            income.month = date.month;
            income.year = date.year;
            return bookService.editRow(income, mode);
        };

    }]);

})();
