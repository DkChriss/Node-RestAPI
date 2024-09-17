const { Category, sequelize } = require("../models")
const storeDTO = require("../http/request/categories/storeDTO")
const updateDTO = require("../http/request/categories/updateDTO")
const idDTO = require("../http/request/categories/idDTO")

class CategoryService {

    static async store(data) {
        const DB = await sequelize.transaction();

        try {
            await storeDTO.validateAsync(data, { abortEarly: false })

            const category = await Category.create({
                name: data.name,
                description: data.description
            })

            await DB.commit()

            return category

        } catch (error) {
            await DB.rollback()
            throw error
        }
    }

    static async show(id) {
        try {
            await idDTO.validateAsync({ id: id })

            const category = await Category.findByPk(id)

            return category

        } catch (error) {
            throw error
        }
    }

    static async update(data, id) {
        const DB = await sequelize.transaction();
        try {
            data.id = id

            await updateDTO.validateAsync(
                data, { abortEarly: false }
            )

            const category = Category.update({
                name: data.name,
                description: data.description
            }, { where: { id: id } })

            await DB.commit()

            return category

        } catch (error) {
            DB.rollback()
            throw error
        }
    }

    static async destroy(id) {
        const DB = await sequelize.transaction()
        try {
            await idDTO.validateAsync({ id: id })

            await Category.destroy({ where: { id: id } })

            await DB.commit()

            return
        } catch (error) {
            await DB.rollback()
            throw error
        }
    }

}

module.exports = CategoryService