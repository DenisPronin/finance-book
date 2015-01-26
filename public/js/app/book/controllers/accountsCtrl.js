(function () {
    'use strict';

    angular.module('Book').controller('accountsCtrl', ['$scope', 'accountsApi', function($scope, accountsApi){

        $scope.accounts = [];

        accountsApi.getAccounts().then(function(accounts) {
            $scope.accounts  = accounts;
        });


    }]);

})();
