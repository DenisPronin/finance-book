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

        me.addRow = function(newRow, mode) {
            var deferred = $q.defer();
            var month = Time.getMonth();
            var year = Time.getYear();

            newRow.month_id = month.id;
            newRow.year = year;
            $http.put('/' + mode + '/add', newRow)
                .success(function(row) {
                    if(!row && !row.ok) {
                        deferred.reject();
                    }
                    deferred.resolve(row.id);
                }).
                error(function() {
                    console.log('Row don\'t added!');
                    deferred.reject();
                });

            return deferred.promise;
        };

        me.deleteRow = function(rowId, mode) {
            var deferred = $q.defer();

            $http.delete('/' + mode + '/' + rowId)
                .success(function(data) {
                    if(!data && !data.ok) {
                        deferred.reject();
                    }
                    deferred.resolve();
                }).
                error(function() {
                    console.log('Row don\'t removed!');
                    deferred.reject();
                });

            return deferred.promise;
        };

        me.editRow = function(row, mode) {
            var deferred = $q.defer();

            var month = Time.getMonth();
            var year = Time.getYear();

            row.month_id = month.id;
            row.year = year;

            $http.post('/' + mode + '/edit', row)
                .success(function(data) {
                    if(!data && !data.ok) {
                        deferred.reject();
                    }
                    deferred.resolve(row.id);
                }).
                error(function() {
                    console.log('Row don\'t edited!');
                    deferred.reject();
                });

            return deferred.promise;

        };

    }]);

})();
