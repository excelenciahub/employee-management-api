const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const USER = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        contact_number: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.STRING
        },
        updatedAt: {
            type: Sequelize.STRING
        }
    },
        {
            hooks: {
                beforeCreate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                },
                beforeUpdate: async (user) => {
                    if (user.password) {
                        const salt = await bcrypt.genSaltSync(10, 'a');
                        user.password = bcrypt.hashSync(user.password, salt);
                    }
                }
            },
            instanceMethods: {
                validPassword: (password) => {
                    return bcrypt.compareSync(password, this.password);
                }
            }
        });
    USER.prototype.validPassword = async (password, hash) => {
        return await bcrypt.compareSync(password, hash);
    }
    return USER;
};