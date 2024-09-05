const bcrypt = require("bcryptjs")
const { User } = require("../models")

class UserService {

    static async store(user) {
        const {username, name, email, password} = user
        const hashedPassword = await bcrypt.hash(password, 10)

        return await User.create({
            username,
            password: hashedPassword,
            email,
            name
        })
        
    }

}

module.exports = UserService