(function () {
    'use strict';

    angular.module('Book').controller('accountsCtrl', ['$scope', 'accountsApi', function($scope, accountsApi) {

        this.mode = 'accounts';
        $scope.accounts = [];
        $scope.newAccountProps = {
            name: '',
            money: '',
            currency_id: 2
        };

    }]);

})();
