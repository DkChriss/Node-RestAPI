const joi = require("joi")
const { User } = require("../../models");


const userDTO = joi.object({
    id: joi.number(),
    username: joi.string().required().external(
        async (username) => {
            const existsUser = await User.findOne({where: {username: username}})
            if(existsUser) {
                throw new Error("Username is already taken")
            }
        }),
    password: joi.string().required(),
    email: joi.string().email().required().external(
        async (email) => {
            const existsUser = await User.findOne({where: {email: email}})
            if(existsUser) {
                throw new Error("Email is already taken")
            }
        }
    ),
    name: joi.string().required()
})

module.exports = userDTO