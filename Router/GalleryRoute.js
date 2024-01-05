const express = require('express');
const gallery = require('../Controllers/gallery');
const path = require('path')
const multer = require('multer');
const verifyToken = require('../Middleware/VerifyToken.js')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/gallery')
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

router.get("/gallery", gallery.getGallery);
router.get("/gallery/:id", gallery.getGalleryById)
router.post("/gallery", verifyToken, upload.single('foto') , gallery.postGallery);
router.delete("/gallery/:id", verifyToken, gallery.deleteGallery);

module.exports = router;
