(function(){
    "use strict";

    angular.module('Book').service('statusApi', [function(){
        var me = this;

        var statuses = [{
            id: 1,
            name: 'Done'
        }, {
            id: 2,
            name: 'In progress'
        }, {
            id: 3,
            name: 'Neutral'
        }, {
            id: 4,
            name: 'Failure'
        }];

        me.getStatusList = function(){
            return statuses;
        };

        me.getStatusById = function(id) {
            var res = statuses.filter(function(status) {
                return status.id === id;
            });
            if(res[0]) {
                return res[0];
            }
            return null;
        };

        me.getNeutralStatus = function() {
            return statuses[2];
        };

    }]);

})();