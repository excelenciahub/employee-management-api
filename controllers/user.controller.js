const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.findAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send({ status: true, data: users, message: "Users fetched successfully" });
    } catch (err) {
        res.send({ status: false, data: null, message: err.message || "Some error occurred while fetching the users." });
    }
}

exports.findById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.send({ status: true, data: user, message: "User fetched successfully" });
    } catch (err) {
        res.send({ status: false, data: null, message: err.message || "Some error occurred while fetching the user." });
    }
}

exports.add = async (req, res) => {
    try {
        const { body } = req;

        const user = {
            email,
            password,
            first_name,
            last_name,
            gender,
            city,
            contact_number,
        } = body;

        try {

            const users = await User.findAll({
                where: {
                    email: user.email
                }
            });

            if (users && users.length > 0) {
                res.send({ status: false, data: null, message: "Email id already exists" });
            }

            const result = await User.create(user);
            delete result.dataValues.password;
            res.send({ status: true, data: result, message: "User created successfully" });
        } catch (err) {
            res.send({ status: false, data: null, message: err.message || "Some error occurred while creating the user." });
        }
    } catch (err) {
        res.send({ status: false, data: null, message: err.message || "Some error occurred while creating the user." });
    }
}

exports.update = async (req, res) => {
    try {
        const { body } = req;

        const user = {
            id,
            email,
            first_name,
            last_name,
            gender,
            city,
            contact_number,
        } = body;

        try {

            const users = await User.findAll({
                where: {
                    email: user.email,
                    id: { [Op.ne]: user.id }
                }
            });

            if (users && users.length > 0) {
                res.send({ status: false, data: null, message: "Email id already exists" });
            }
            delete user.password;
            const result = await User.update(
                user,
                {
                    where: {
                        id: user.id
                    }
                }
            )

            if (result[0] === 1) {
                const userObj = await User.findByPk(user.id);
                console.log(userObj)
                delete userObj.dataValues.password;
                res.send({ status: true, data: userObj, message: "User updated successfully" });
            } else {
                res.send({ status: false, data: null, message: "Some error occurred while updating the user." });
            }

        } catch (err) {
            res.send({ status: false, data: null, message: err.message || "Some error occurred while updating the user." });
        }
    } catch (err) {
        res.send({ status: false, data: null, message: err.message || "Some error occurred while updating the user." });
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id
        const num = await User.destroy({ where: { id } });
        if (num == 1) {
            res.send({ status: true, data: {}, message: "User deleted successfully" });
        } else {
            res.send({ status: true, data: {}, message: `Cannot delete User with id=${id}. Maybe User was not found!` });
        }
    } catch (err) {
        res.send({ status: false, data: null, message: err.message || "Some error occurred while fetching the user." });
    }
}