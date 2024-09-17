const Joi = require("joi")
const { User } = require("../../../models");

const userDTO = Joi.object({
    username: Joi.string().required().external(
        async (username) => {
            const existsUsername = await User.findOne({ where: { username: username } })
            if (existsUsername) {
                throw new joi.ValidationError("Username is already taken", [{
                    message: "Username is already taken",
                    path: ["username"],
                    type: "unique.username",
                    context: { key: "username" }
                }], username);
            }
        }),
    password: Joi.string().required(),
    email: Joi.string().email().required().external(
        async (email) => {
            const existsEmail = await User.findOne({ where: { email: email } })
            if (existsEmail) {
                throw new joi.ValidationError("Email is already taken", [{
                    message: "Email is already taken",
                    path: ["email"],
                    type: "unique.email",
                    context: { key: "email" }
                }], email);
            }
        }
    ),
    name: Joi.string().required()
})

module.exports = userDTO