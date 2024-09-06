const joi = require("joi")

const userSchema = joi.object({
    id: joi.number(),
    username: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email().required(),
    name: joi.string().required()
})

class UserDTO {
    constructor({id,username,password,email,name}) {
        this.id = id
        this.username = username
        this.password = password
        this.email = email
        this.name = name
    }

    static validate(data) {
        return userSchema.validate(data)
    }
}

module.exports = UserDTO