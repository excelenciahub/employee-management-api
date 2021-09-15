const db = require("../models");
const jwt = require('jsonwebtoken');

const User = db.users;

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email)
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(500).send({ status: false, data: null, message: "User not found" });
        }
        if (!user.dataValues.password || !await user.validPassword(password, user.dataValues.password)) {
            res.status(500).send({ status: false, data: null, message: "User not founds" });
        } else {
            delete user.dataValues.password

            const expiresIn = 24 * 60 * 60; // 24 hours
            const accessToken = jwt.sign({ ...user.dataValues }, process.env.JWT_SECRET_KEY, {
                expiresIn: expiresIn
            });

            res.send({ status: true, accessToken: accessToken, data: user, message: "User successfully login" });
        }
    } catch (err) {
        res.send({ status: true, data: null, message: err.message || "Some error occurred while authenticate user." });
    }
}
