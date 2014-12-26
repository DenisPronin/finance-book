module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('landing');
    });

    app.get('/book', function (req, res) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            res.render('layout');
        }
    });

    app.get('/book/partials/:name', function (req, res) {
        if(!req.isAuthenticated()) {
            res.redirect('/');
        }
        else {
            var name = req.params.name;
            res.render('partials/' + name);
        }
    });

};

