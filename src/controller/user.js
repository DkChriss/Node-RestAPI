const userService = require("../service/user")
const jsonResponse = require("../http/response/jsonResponse")
const UserDTO = require("../http/request/user/responseDTO")
const Joi = require("joi");

class UserController {

    static async store(req, res) {

        try {

            const { id, name, username, email } = await userService.store(req.body);
            const newUser = new UserDTO(id, name, username, email)
            return jsonResponse.successResponse(
                res,
                201,
                "User has been registered successfully",
                newUser
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

            const { id, username, name, email } = await userService.show(req.params.id)

            const user = new UserDTO(id, username, name, email)

            return jsonResponse.successResponse(
                res,
                200,
                "User exists",
                user
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

            await userService.update(req.body, req.params.id)
            const { name, username, email } = req.body
            const user = new UserDTO(req.params.id, name, username, email)
            return jsonResponse.successResponse(
                res,
                200,
                "User has been updated",
                user
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

            await userService.destroy(req.params.id)

            return jsonResponse.successResponse(
                res,
                200,
                "User has been deleted"
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

module.exports = UserController