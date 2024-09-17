const Joi = require("joi");
const { User } = require("../../../models");
const { Op } = require("sequelize");

const updateDTO = Joi.object({
    id: Joi.number().required().external(
        async (id) => {
            const exists = await User.findByPk(id);
            if (!exists) {
                throw new Joi.ValidationError('ID does not exist', [{
                    message: 'ID does not exist',
                    path: ['id'],
                    type: 'id.not_found',
                    context: { key: 'id' }
                }], id);
            }
        })
        .messages({
            'number.base': 'ID must be a number',
            'any.required': 'ID is required'
        }),

    username: Joi.string().required().external(
        async (username, helpers) => {
            const id = helpers?.state?.ancestors?.[0]?.id;
            const existsUsername = await User.findOne({
                where: {
                    username: username,
                    id: id ? { [Op.ne]: id } : undefine
                }
            });
            if (existsUsername) {
                throw new Joi.ValidationError("Username is already taken", [{
                    message: "Username is already taken",
                    path: ["username"],
                    type: "unique.username",
                    context: { key: "username" }
                }], username);
            }
        }
    ),

    password: Joi.string().required(),

    email: Joi.string().email().required().external(
        async (email, helpers) => {
            const id = helpers?.state?.ancestors?.[0]?.id;
            const existsEmail = await User.findOne({
                where: {
                    email: email,
                    id: id ? { [Op.ne]: id } : undefine
                }
            });
            if (existsEmail) {
                throw new Joi.ValidationError("Email is already taken", [{
                    message: "Email is already taken",
                    path: ["email"],
                    type: "unique.email",
                    context: { key: "email" }
                }], email);
            }
        }
    ),

    name: Joi.string().required()
});

module.exports = updateDTO;
