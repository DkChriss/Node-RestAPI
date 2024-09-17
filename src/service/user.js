const bcrypt = require("bcryptjs")
const { User, sequelize } = require("../models")
const storeDTO = require("../http/request/user/storeDTO")
const updateDTO = require("../http/request/user/updateDTO")
const idDTO = require("../http/request/user/idDTO")
const { where } = require("sequelize")

class UserService {

    static async store(data) {

        const DB = await sequelize.transaction();

        try {

            await storeDTO.validateAsync(data, { abortEarly: false })

            const hashedPassword = await bcrypt.hash(data.password, 10)

            const newUser = await User.create({
                username: data.username,
                password: hashedPassword,
                email: data.email,
                name: data.name
            })

            await DB.commit()

            return newUser

        } catch (error) {
            await DB.rollback();
            throw error;
        }
    }

    static async show(id) {

        try {
            await idDTO.validateAsync({ id: id })

            const user = await User.findByPk(id);

            return user;

        } catch (error) {
            throw error;
        }

    }

    static async update(data, id) {

        const DB = await sequelize.transaction()

        try {

            data.id = id

            await updateDTO.validateAsync(
                data, { abortEarly: false }
            )

            const hashedPassword = await bcrypt.hash(data.password, 10)

            const user = User.update({
                username: data.username,
                name: data.name,
                email: data.email,
                password: hashedPassword
            }, { where: { id: id } })

            await DB.commit()

            return user

        } catch (error) {
            await DB.rollback()
            throw error
        }



    }

    static async destroy(id) {

        const DB = await sequelize.transaction()

        try {

            await idDTO.validateAsync({ id: id })

            await User.destroy({ where: { id: id } })

            await DB.commit()

        } catch (error) {
            await DB.rollback()
            throw error
        }
    }
}

module.exports = UserService