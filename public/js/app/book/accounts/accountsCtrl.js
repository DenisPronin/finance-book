(function () {
    'use strict';

    angular.module('Book').controller('accountsCtrl', ['$scope', 'accountsApi', 'Time', 'currencyApi', function($scope, accountsApi, Time, currencyApi) {

        $scope.mode = 'accounts';
        $scope.accounts = [];
        $scope.newAccountProps = {
            name: '',
            money: '',
            currency_id: 2
        };

    }]);

})();
