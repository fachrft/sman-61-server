const express = require('express');
const pojokKarya = require('../Controllers/pojokKarya.js');
const path = require('path')
const multer = require('multer')
const verifyToken = require('../Middleware/VerifyToken.js')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/pojokkarya')
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

router.get("/pojok_karya", pojokKarya.getPojokKarya);
router.get("/pojok_karya/:id", pojokKarya.getPojokKaryaById)
router.post("/pojok_karya", verifyToken, upload.single('foto'), pojokKarya.postPojokKarya);
router.delete("/pojok_karya/:id", verifyToken, pojokKarya.deletePojokKarya);

module.exports = router;
