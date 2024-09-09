const bcrypt = require("bcryptjs")
const { User, sequelize } = require("../models");
const { Op } = require("sequelize");
const userDTO = require("../http/request/UserDTO");
const Joi = require('joi')

class UserService {

    static async store(data) {
        
        const DB = await sequelize.transaction();

        try {

            await userDTO.validateAsync(data, { abortEarly: false})
            
            const hashedPassword = await bcrypt.hash(password, 10)
    
            const newUser = await User.create({
                username: data.username,
                password: hashedPassword,
                email: data.email,
                name: data.name
            }, {DB})
            
            await DB.commit()

            return newUser

        } catch (error) {
            await DB.rollback();
            console.log(Joi.isError(error))
            throw error;
        }
    }

    static async show(id) {
        const user = await User.findByPk(id);
        
        if(!user) {
            throw new Error("User not found")
        }
        
        return user;
    }

    static async update(id, user) {

        const DB = await sequelize.transaction()

        try {

            const currentUser = await User.findByPk(id);

            if(!currentUser) {
                throw new Error("User not found")
            }
    
            const {username, name, email, password} = user
    
            const hashedPassword = await bcrypt.hash(password, 10)
    
            const existsUser = await User.findOne({
                where: {
                    [Op.or]: [{username}, {email}],
                    id: {
                        [Op.ne] : id
                    }
                }
            });
            
            if(existsUser) {
                throw new Error('Username or email already exists')
            } else {
                const updatedUser = await currentUser.update({
                    username,
                    password: hashedPassword,
                    email,
                    name
                })
    
                DB.commit()
    
                return updatedUser
            }
    

        } catch (error) {
            console.log(error.message)
            DB.rollback()
        }
        


    }

    static async destroy(id) {

        const DB = await sequelize.transaction()
        try {

            const user = await User.findByPk(id)

            if(!user) {
                throw new Error("User not found")
            }
    
            await user.destroy()
        
            DB.commit()

        } catch(error) {
            DB.rollback()
            console.log(error)
        }
    }
}

module.exports = UserService