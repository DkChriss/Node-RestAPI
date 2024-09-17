const Joi = require("joi")
const { Category } = require("../../../models");

const categoryDTO = Joi.object({
    id: Joi.number().required().external(async (id) => {
        const exists = await Category.findByPk(id);
        if (!exists) {
            throw new Joi.ValidationError('ID does not exist', [{
                message: 'ID does not exist',
                path: ['id'],
                type: 'id.not_found',
                context: { key: 'id' }
            }], id);
        }
    }).messages({
        'number.base': 'ID must be a number',
        'any.required': 'ID is required'
    }),
    name: Joi.string().required().external(
        async (name) => {
            const existsName = await Category.findOne({ where: { name: name } })
            if (existsName) {
                throw new joi.ValidationError("Name is already taken", [{
                    message: "Name is already taken",
                    path: ["name"],
                    type: "unique.name",
                    context: { key: "name" }
                }], name);
            }
        }
    ),
    description: Joi.string()
})

module.exports = categoryDTO