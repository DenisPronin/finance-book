(function () {
    'use strict';

    angular.module('Book').service('costsApi', ['$http', '$q', 'Time', 'bookService', function($http, $q, Time, bookService) {

        var me = this;
        var mode = 'costs';

        var costs = [];

        me.getCosts = function(){
            var deferred = $q.defer();

            bookService.getTableData(mode).then(function(costs) {
                deferred.resolve(costs);
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        };

    }]);

})();
