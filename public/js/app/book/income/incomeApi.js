(function () {
    'use strict';

    angular.module('Book').service('incomeApi', ['$http', '$q', 'Time', 'bookService', function($http, $q, Time, bookService) {

        var me = this;
        var mode = 'income';
        var income = [];

        me.getIncome = function(){
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

    }]);

})();
