const { Joi } = require("express-validation");

module.exports = {
    addUserValidation: {
        body: Joi.object({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            gender: Joi.string().required(),
            city: Joi.string().required(),
            contact_number: Joi.string().required(),
        })
    },
    updateUserValidation: {
        body: Joi.object({
            id: Joi.number().required(),
            email: Joi.string().required().email(),
            password: Joi.string().optional(),
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            gender: Joi.string().required(),
            city: Joi.string().required(),
            contact_number: Joi.string().required(),
        })
    }
}
