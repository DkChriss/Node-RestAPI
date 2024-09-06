const bcrypt = require("bcryptjs")
const { User } = require("../models");
const { Op, where } = require("sequelize");

class UserService {

    static async store(user) {
        const {username, name, email, password} = user

        const hashedPassword = await bcrypt.hash(password, 10)

        const existsUser = await User.findOne({
            where: {
                [Op.or]: [{username}, {email}]
            }
        });
        
        if(existsUser) {
            throw new Error('Username or email already exists')
        } 

        return await User.create({
            username,
            password: hashedPassword,
            email,
            name
        })
        
    }

    static async show(id) {
        const user = await User.findByPk(id);
        
        if(!user) {
            throw new Error("User not found")
        }
        
        return user;
    }

}

module.exports = UserService