(function () {
    'use strict';

    angular.module('App').directive('datepicker', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                $(element).datepicker({
                    autoclose: true,
                    todayHighlight: true,
                    format: 'dd/mm/yyyy'
                });
            }
        };
    });

})();
