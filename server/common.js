var getFieldsFromModel = function(model, ignoreFields) {
    if(!ignoreFields) {
        ignoreFields = [];
    }
    var fields = Object.keys(model).filter(function(_field) {
        var notIgnore = true;
        for (var i = 0; i < ignoreFields.length; i++) {
            if(_field === ignoreFields[i]) {
                notIgnore = false;
                break;
            }
        }
        return notIgnore;
    });
    fields = fields.join(',');
    return fields;
};

module.exports = {
    getFieldsFromModel : getFieldsFromModel
};