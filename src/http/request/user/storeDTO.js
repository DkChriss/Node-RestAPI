const joi = require("joi")
const { User } = require("../../../models");

const userDTO = joi.object({
    username: joi.string().required().external(
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
    password: joi.string().required(),
    email: joi.string().email().required().external(
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
    name: joi.string().required()
})

module.exports = userDTO