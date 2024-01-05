
const Admin = require('../Model/admin')
const jwt = require("jsonwebtoken")

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.sendStatus(403);
        }

        const user = await Admin.findOne({
            where: {
                secret_key: refreshToken,
            },
        });

        if (!user) {
            return res.sendStatus(403);
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(403);
            }

            const userId = user.id;
            const name = user.name;

            const accessToken = jwt.sign({ userId, name }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "15s",
            });

            res.json({ accessToken });
        });
    } catch (error) {
        console.error("Error in refreshToken:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = refreshToken
