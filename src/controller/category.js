const categoryService = require("../service/category")
const jsonResponse = require("../http/response/jsonResponse")
const categoryDTO = require("..//http/request/categories/responseDTO")
const Joi = require("joi")
const CategoryService = require("../service/category")

class CategoryController {

    static async store(req, res) {
        try {

            const { id, name, description } = await categoryService.store(req.body)

            const newCategory = new categoryDTO(id, name, description)

            return jsonResponse.successResponse(
                res,
                201,
                "Category has been registered successfully",
                newCategory
            )

        } catch (error) {
            return Joi.isError(error) ? jsonResponse.validationResponse(
                res,
                409,
                "Validation error",
                error.details.map(err => err.message)
            ) : jsonResponse.errorResponse(
                res,
                500,
                error.message
            )
        }
    }

    static async show(req, res) {
        try {

            const { id, name, description } = await CategoryService.show(req.params.id)

            const category = new categoryDTO(id, name, description)

            return jsonResponse.successResponse(
                res,
                200,
                "Category exists",
                category
            )

        } catch (error) {
            return Joi.isError(error) ? jsonResponse.validationResponse(
                res,
                409,
                "Validation error",
                error.details.map(err => err.message)
            ) : jsonResponse.errorResponse(
                res,
                500,
                error.message
            )
        }
    }

    static async update(req, res) {
        try {

            await categoryService.update(req.body, req.params.id)
            const { name, description } = req.body
            const category = new categoryDTO(req.params.id, name, description)

            return jsonResponse.successResponse(
                res,
                200,
                "Category has been updated",
                category
            )

        } catch (error) {
            return Joi.isError(error) ? jsonResponse.validationResponse(
                res,
                409,
                "Validation error",
                error.details.map(err => err.message)
            ) : jsonResponse.errorResponse(
                res,
                500,
                error.message
            )
        }
    }

    static async destroy(req, res) {
        try {
            await categoryService.destroy(req.params.id)
            return jsonResponse.successResponse(
                res,
                200,
                "Category has been deleted"
            )
        } catch (error) {

            return Joi.isError(error) ? jsonResponse.validationResponse(
                res,
                409,
                "Validation error",
                error.details.map(err => err.message)
            ) : jsonResponse.errorResponse(
                res,
                500,
                error.message
            )

        }
    }


}

module.exports = CategoryController