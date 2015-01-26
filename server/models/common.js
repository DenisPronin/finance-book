var getFieldsFromModel = function(model) {
    var fields = Object.keys(model).filter(function(_field) {
        return (_field !== 'user_id');
    });
    fields = fields.join(',');
    return fields;
};

module.exports = {
    getFieldsFromModel : getFieldsFromModel
};