const PojokKarya = require('../Model/pojokKarya')
const path = require('path')
const fs = require('fs')

exports.getPojokKarya = async (req, res) => {
    try {
        const pojokKarya = await PojokKarya.findAll();
        res.status(200).json(pojokKarya);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
exports.postPojokKarya = async (req, res) => {
    try {
        const adminId = req.id;
        let finalImageUrl = req.protocol + '://' + req.get('host') + '/pojokkarya/' + req.file.filename

        const newPojokKarya = await PojokKarya.create({
            foto: finalImageUrl,
            adminId: adminId,
        })
        res.status(201).json({ data: newPojokKarya, status: 'pojok karya berhasil di upload' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

exports.getPojokKaryaById = async (req, res) => {
    try {
        const gambar = await PojokKarya.findOne({
            where: {
                id: req.params.id
            }
        });
        
        res.status(200).json({ data: gambar });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


exports.deletePojokKarya = async (req, res) => {
    try {
        const gambar = await PojokKarya.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!gambar) return res.status(404).json({ msg: "Gambar not found" });
        console.log(gambar)

        if (gambar.adminId !== req.id) {
            return res.status(403).json({ msg: "Dilarang: Anda tidak memiliki izin untuk menghapus galeri ini" });
        }
        
        const filePath = path.join(__dirname, '../public/pojokkarya',  path.basename(gambar.foto));

        fs.unlinkSync(filePath);

        await PojokKarya.destroy({
            where: {
                id: gambar.id,
            },
        });
        res.status(200).json({ data: gambar, pesan: "foto berhasil di hapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
