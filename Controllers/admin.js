const Admin = require("../Model/admin.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.Register = async (req, res) => {
    const { name, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Admin.create({
            name: name,
            password: hashPassword,
        });
        res.status(201).json({ msg: "registration successfuly" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

exports.Login = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: {
                name: req.body.name,
            },
        });

        if (!admin) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(req.body.password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Wrong password" });
        }

        const accessToken = jwt.sign({ id: admin.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15s",
        });

        const refreshToken = jwt.sign({ id: admin.id }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d",
        });

        await admin.update(
            {
                secret_key: refreshToken,
            },
            {
                where: {
                    name: admin.name,
                },
            }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ accessToken, adminId: admin.id });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.Logout = async (req, res) => {
    try {
        const refToken = req.cookies.refreshToken;
        if (refToken === null) {
            return res.sendStatus(204);
        }
        const admin = await Admin.findOne({
            where: {
                secret_key: refToken,
            }
        })
        await admin.update({ secret_key: null });
        res.clearCookie("refreshToken");
        res.status(200).send({ msg: "anda telah logout" });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send("Internal Server Error");
    }
};
