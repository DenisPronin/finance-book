(function () {
    'use strict';

    angular.module('User').directive('userHeader', [function(){
        return {
            restrict: 'E',
            templateUrl: 'js/app/user/templates/user-header-tpl.html',
            replace: true
        }
    }]);

})();
