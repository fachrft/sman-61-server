const Majalah = require('../Model/majalah')
const path = require('path')
const fs = require('fs')

exports.getMajalah = async (req, res) => {
    try {
        const majalah = await Majalah.findAll();
        res.status(200).json(majalah);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
exports.postMajalah = async (req, res) => {
    try {
        const tahunTerbit = req.body.tahun_terbit
        const adminId = req.id;

        let finalImageUrl = req.protocol + '://' + req.get('host') + '/majalah/' + req.file.filename

        const newMajalah = await Majalah.create({
            tahun_terbit: tahunTerbit,
            foto: finalImageUrl,
            adminId: adminId,
        })
        res.status(201).json({ data: newMajalah, status: 'majalah berhasil di upload' });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

exports.getMajalahById = async (req, res) => {
    try {
        const gambar = await Majalah.findOne({
            where: {
                id: req.params.id
            }
        });
        
        res.status(200).json({ data: gambar });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


exports.deleteMajalah = async (req, res) => {
    try {
        const gambar = await Majalah.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!gambar) return res.status(404).json({ msg: "Gambar not found" });
        console.log(gambar)

        if (gambar.adminId !== req.id) {
            return res.status(403).json({ msg: "Dilarang: Anda tidak memiliki izin untuk menghapus galeri ini" });
        }
        const filePath = path.join(__dirname, '../public/majalah',  path.basename(gambar.foto));

        fs.unlinkSync(filePath);

        await Majalah.destroy({
            where: {
                id: gambar.id,
            },
        });
        res.status(200).json({ data: gambar, pesan: "foto berhasil di hapus" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
