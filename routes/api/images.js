const router = require('express').Router();
const handler = require('../../common/handler')(false);
const path = require('path');
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/imgs/u/');
        },
        filename: function (req, file, cb) {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        }
    }),
    limits: {
        fileSize: 8 * 1024 * 1024
    }
}).single("img");

router.post('/', (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            handler.sendResult(res, null, err, err.message);
            return;
        }
        handler.sendResult(res, {
            "mimetype": req.file['mimetype'],
            "filename": req.file['filename'],
            "path": "imgs/u/" + req.file['filename']
        });
    });
});

module.exports = router;