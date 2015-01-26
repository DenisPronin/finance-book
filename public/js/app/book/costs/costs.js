(function () {
    'use strict';

    angular.module('Book').directive('costs', [function(){
        return {
            restrict: 'E',
            templateUrl: 'js/app/book/costs/costs-tpl.html',
            replace: true
        }
    }]);

})();
