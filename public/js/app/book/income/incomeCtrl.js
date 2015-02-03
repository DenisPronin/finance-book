(function () {
    'use strict';

    angular.module('Book').controller('incomeCtrl', ['$scope', 'incomeApi', 'currencyApi', function($scope, incomeApi, currencyApi) {

        this.mode = 'income';
        $scope.income = [];
        $scope.newIncomeProps = {
            name: '',
            money: '',
            currency_id: currencyApi.getDefaultCurrency().id,
            date: moment().format('DD/MM/YYYY')
        };

    }]);

})();
