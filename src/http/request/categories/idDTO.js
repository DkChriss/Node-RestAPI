const Joi = require("joi")
const { Category } = require("../../../models");

const idSchema = Joi.object({
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
    })
});

module.exports = idSchema;