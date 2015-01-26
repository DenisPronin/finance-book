(function () {
    'use strict';

    angular.module('Book').service('bookService', ['$http', '$q', 'Time', function($http, $q, Time) {

        var me = this;
        var income = [];

        me.getTableData = function(mode) {
            var deferred = $q.defer();
            var month = Time.getMonth();
            var year = Time.getYear();

            $http.get('/' + mode + '/' + month.id + '/' + year).
                success(function(data) {
                    if(!data) {
                        deferred.reject();
                    }
                    deferred.resolve(data);
                }).
                error(function() {
                    console.log('Something going wrong!');
                    deferred.reject();
                });

            return deferred.promise;
        };

    }]);

})();
