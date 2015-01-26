(function () {
    'use strict';

    angular.module('User').controller('userCtrl', ['$scope', 'UserApi', function($scope, UserApi){

        $scope.user = null;

        UserApi.getUserData().then(function(user) {
           $scope.user  = user;
        });

    }]);

})();
