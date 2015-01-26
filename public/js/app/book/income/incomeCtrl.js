(function () {
    'use strict';

    angular.module('Book').controller('incomeCtrl', ['$scope', 'incomeApi', 'Time', function($scope, incomeApi, Time) {

        $scope.income = [];

        $scope.$watch(function() {
            return Time.getMonth();
        }, function(newValue, oldValue){
            if(newValue) {
                getIncome();
            }
        });

        $scope.$watch(function() {
            return Time.getYear();
        }, function(newValue, oldValue){
            if(newValue !== oldValue) {
                getIncome();
            }
        });

        var getIncome = function() {
            incomeApi.getIncome().then(function(income) {
                $scope.income  = income;
            });
        };

    }]);

})();
