const Router = require('express').Router;
const router = Router(); 
const controller = require('../controller/controller');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderName = req.body.assistantName;
        const dir = path.join(__dirname, '../files', folderName);

        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) {
                return cb(err);
            }
            cb(null, dir);
        });
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage });

router.post('/upload', upload.array('files'), controller.uploadFiles);

module.exports = router;