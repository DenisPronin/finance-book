(function () {
    'use strict';

    angular.module('Book').controller('debtsCtrl', ['$scope', 'debtsApi', 'currencyApi', function($scope, debtsApi, currencyApi) {

        this.mode = 'debts';
        $scope.debts = [];

        $scope.newDebtProps = {
            name: '',
            money: '',
            currency_id: currencyApi.getDefaultCurrency().id,
            deadline: moment().format('DD/MM/YYYY')
        };

    }]);

})();
