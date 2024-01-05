const express = require('express');
const artikel = require('../Controllers/artikel.js')
const path = require('path')
const multer = require('multer')
const verifyToken = require('../Middleware/VerifyToken.js')


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/artikel')
    },
    filename: function(req, file, cb) {
        const originalname = path.parse(file.originalname).name;
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const filename = `${originalname}-${timestamp}${path.extname(file.originalname)}`;
        const sanitizedFilename = filename.replace(/\s+/g, '-'); // Ganti spasi dengan tanda hubung
        cb(null, sanitizedFilename);
    }
});

const upload = multer({storage})

const router = express.Router();

router.get('/artikel', artikel.getArtikel);
router.post('/artikel', verifyToken, upload.single('foto'), artikel.postArtikel);
router.delete('/artikel/:id', verifyToken, artikel.deleteArtikel);

module.exports = router;
