(function () {
    'use strict';

    angular.module('Book').directive('timeSelect', [function(){
        return {
            restrict: 'E',
            templateUrl: 'js/app/book/time/time-select-tpl.html',
            replace: true,
            controller: function($scope, Time) {
                $scope.months = Time.getMonthsList();
                $scope.currentMonth = '';
                $scope.currentMonthName = '';
                $scope.currentYear = '';

                $scope.$watch(function() {
                    return Time.getMonth();
                }, function(newValue){
                    $scope.currentMonth = newValue;
                    $scope.currentMonthName = $scope.currentMonth['en'];
                });

                $scope.$watch(function() {
                    return Time.getYear();
                }, function(newValue, oldValue){
                    $scope.currentYear = newValue;
                });

                $scope.changeMonth = function(monthId) {
                    Time.setMonth(monthId);
                };

                $scope.changeYear = function(year) {
                    Time.setYear(year);
                };

                $scope.minusMonth = function() {
                    var id = $scope.currentMonth.id;
                    if(id > 0) {
                        $scope.changeMonth(id - 1);
                    }
                };

                $scope.plusMonth = function() {
                    var id = $scope.currentMonth.id;
                    if(id < $scope.months.length - 1) {
                        $scope.changeMonth(id + 1);
                    }
                };

                $scope.minusYear = function() {
                    $scope.changeYear(parseInt($scope.currentYear) - 1);
                };

                $scope.plusYear = function() {
                    $scope.changeYear(parseInt($scope.currentYear) + 1);
                };

                Time.init();
            },
            link: function(scope, element) {
            }
        }
    }]);

})();
