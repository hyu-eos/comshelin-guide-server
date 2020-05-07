let router = require('express').Router();
let dbHandler = require('../../common/handler')(false);

/* GET home page. */
router.get('/list', function (req, res, next) {
    dbHandler.dbConnect(req, res, function (conn, callback) {
        conn.query("SELECT * FROM restaurant", [], function (err, rows) {
            if (err) {
                callback(null, err);
            }
            callback(rows);
        });
    });
});

router.get('/', function (req, res, next) {
    let id = req.query["id"];
    dbHandler.dbConnect(req, res, function (conn, callback) {
        conn.query("SELECT * FROM restaurant WHERE id = ?", [id], function (err, rows) {
            if (err) {
                callback(null, err);
            }
            callback(rows);
        });
    });
});

router.post('/', function (req, res, next) {
    var value = req.body;
    dbHandler.dbConnect(req, res, function (conn, callback) {
        conn.query("INSERT INTO restaurant SET ?", value, function (err, rows) {
            if (err) {
                console.log(err);
                callback(null, err);
            }
            callback(null, null);
        });
    });
});

router.delete('/', function (req, res, next) {
    let id = req.query["id"];
    dbHandler.dbConnect(req, res, function (conn, callback) {
        conn.query("DELETE FROM restaurant WHERE id = ?", [id], function (err, rows) {
            if (err) {
                console.log(err);
                callback(null, err);
            }
            callback(null, null);
        });
    });
});

module.exports = router;
