(function () {
    'use strict';

    angular.module('Book').controller('accountsCtrl', ['$scope', 'accountsApi', 'currencyApi', function($scope, accountsApi, currencyApi) {

        this.mode = 'accounts';
        $scope.accounts = [];
        $scope.newAccountProps = {
            name: '',
            money: '',
            currency_id: currencyApi.getDefaultCurrency().id
        };

    }]);

})();
