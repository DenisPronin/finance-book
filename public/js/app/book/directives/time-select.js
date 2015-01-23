(function () {
    'use strict';

    angular.module('Book').directive('timeSelect', [function(){
        return {
            restrict: 'E',
            templateUrl: 'js/app/book/templates/time-select-tpl.html',
            replace: true,
            controller: function($scope, Time) {
                $scope.months = Time.getMonthsList();
                $scope.currentMonth = '';
                $scope.currentMonthName = '';
                $scope.currentYear = '';

                $scope.$watch(function() {
                    return Time.getMonth();
                }, function(newValue, oldValue){
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

                Time.init();
            },
            link: function(scope, element) {

            }
        }
    }]);

})();
