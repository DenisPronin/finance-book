"use strict";

app.controller('AppCtrl', function ($scope, $http) {

    $http({
        method: 'GET',
        url: '/api/name'
    })
    .success(function (data, status, headers, config) {
        $scope.names = data;
    })
    .error(function (data, status, headers, config) {
        $scope.name = 'Error!';
    });

});

app.controller('AppCtrl2', function ($scope, $http) {

    $scope.name = '123';
});