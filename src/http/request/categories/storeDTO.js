const Joi = require("joi")
const { Category } = require("../../../models");

const categoryDTO = Joi.object({
    name: Joi.string().required().external(
        async (name) => {
            const existsName = await Category.findOne({ where: { name: name } })
            if (existsName) {
                throw new Joi.ValidationError("Name is already taken", [{
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