module.exports = function (app) {
    app.get('/book', function (req, res) {
        res.render('layout');
    });

    app.get('/book/partials/:name', function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name);
    });

};

