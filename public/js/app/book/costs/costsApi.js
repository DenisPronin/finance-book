(function () {
    'use strict';

    angular.module('Book').service('costsApi', ['$http', '$q', 'Time', 'bookService', 'statusApi', function($http, $q, Time, bookService, statusApi) {

        var me = this;
        var mode = 'costs';

        var costs = [];

        me.get = function(){
            var deferred = $q.defer();

            bookService.getTableData(mode).then(function(costs) {
                deferred.resolve(costs);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        };

        me.add = function(newCost) {
            newCost.status_id = statusApi.getDefaultStatus().id;
            return bookService.addRow(newCost, mode);
        };

        me.deleteRow = function(costId) {
            return bookService.deleteRow(costId, mode);
        };

        me.edit = function(cost) {
            return bookService.editRow(cost, mode);
        };

    }]);

})();
