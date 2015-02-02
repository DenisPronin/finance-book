(function () {
    'use strict';

    angular.module('Book').controller('incomeCtrl', ['$scope', 'incomeApi', 'Time', function($scope, incomeApi, Time) {

        $scope.mode = 'income';
        $scope.income = [];
        $scope.newIncomeProps = {
            name: '',
            money: '',
            currency_id: 2,
            date: ''
        };

    }]);

})();
