(function () {
    'use strict';

    angular.module('Book').controller('debtsCtrl', ['$scope', 'debtsApi', 'Time', function($scope, debtsApi, Time) {

        $scope.debts = [];

        $scope.$watch(function() {
            return Time.getMonth();
        }, function(newValue, oldValue){
            if(newValue) {
                getDebts();
            }
        });

        $scope.$watch(function() {
            return Time.getYear();
        }, function(newValue, oldValue){
            if(newValue !== oldValue) {
                getDebts();
            }
        });

        var getDebts = function() {
            debtsApi.getDebts().then(function(debts) {
                $scope.debts  = debts;
            });
        };

    }]);

})();
