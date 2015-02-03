(function () {
    'use strict';

    angular.module('Book').controller('costsCtrl', ['$scope', 'costsApi', 'currencyApi', function($scope, costsApi, currencyApi) {

        this.mode = 'costs';
        $scope.costs = [];

        $scope.newCostProps = {
            name: '',
            cost: '',
            spend: '',
            currency_id: currencyApi.getDefaultCurrency().id
        };

    }]);

})();
