(function () {
    'use strict';

    angular.module('Book').service('incomeApi', ['$http', '$q', 'Time', function($http, $q, Time) {

        var me = this;
        var income = [];

        me.getIncome = function(){
            var deferred = $q.defer();
            var month = Time.getMonth();
            var year = Time.getYear();

            $http.get('/income/' + month.id + '/' + year).
                success(function(income) {
                    if(!income) {
                        deferred.reject();
                    }
                    deferred.resolve(income);
                }).
                error(function() {
                    console.log('You are not authorized!');
                    deferred.reject();
                });

            return deferred.promise;
        };

    }]);

})();
