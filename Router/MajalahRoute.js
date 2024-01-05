const express = require('express');
const majalah = require('../Controllers/majalah.js');
const path = require('path')
const multer = require('multer')
const verifyToken = require('../Middleware/VerifyToken.js')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/majalah')
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

router.get("/majalah", majalah.getMajalah);
router.get("/majalah/:id", majalah.getMajalahById)
router.post("/majalah", verifyToken, upload.single('foto'), majalah.postMajalah);
router.delete("/majalah/:id", verifyToken, majalah.deleteMajalah);

module.exports = router;
