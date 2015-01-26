(function () {
    'use strict';

    angular.module('Book').directive('income', [function(){
        return {
            restrict: 'E',
            templateUrl: 'js/app/book/income/income-tpl.html',
            replace: true
        }
    }]);

})();
