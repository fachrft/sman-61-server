const Gallery = require('../Model/gallery')
const path = require('path')
const fs = require('fs')

exports.getGallery = async (req, res) => {
    try {
        const gallery = await Gallery.findAll();
        res.status(200).json(gallery);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
exports.postGallery = async (req, res) => {
    try {
        const keterangan = req.body.keterangan;
        const adminId = req.id;

        let finalImageUrl = req.protocol + '://' + req.get('host') + '/gallery/' + req.file.filename

        const newGallery = await Gallery.create({
            foto: finalImageUrl,
            keterangan: keterangan,
            adminId: adminId,
        })
        res.status(201).json({ data: newGallery, status: 'gambar berhasil di upload' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

exports.getGalleryById = async (req, res) => {
    try {
        const gambar = await Gallery.findOne({
            where: {
                id: req.params.id
            }
        });
        
        res.status(200).json({ data: gambar });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


exports.deleteGallery = async (req, res) => {
    try {
        const gambar = await Gallery.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!gambar) return res.status(404).json({ msg: "Gambar not found" });

        if (gambar.adminId !== req.id) {
            return res.status(403).json({ msg: "Dilarang: Anda tidak memiliki izin untuk menghapus galeri ini" });
        }
        
        const filePath = path.join(__dirname, '../public/gallery',  path.basename(gambar.foto));

        fs.unlinkSync(filePath);

        await Gallery.destroy({
            where: {
                id: gambar.id,
            },
        });
        res.status(200).json({ data: gambar, pesan: "foto berhasil di hapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
