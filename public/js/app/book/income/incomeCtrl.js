(function () {
    'use strict';

    angular.module('Book').controller('incomeCtrl', ['$scope', 'incomeApi', 'Time', function($scope, incomeApi, Time) {

        this.mode = 'income';
        $scope.income = [];
        $scope.newIncomeProps = {
            name: '',
            money: '',
            currency_id: 2,
            date: new Date()
        };

    }]);

})();
