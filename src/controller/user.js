const userDTO = require("../http/request/UserDTO")
const userService = require("../service/user")
const jsonResponse = require("../http/response/jsonResponse")
const UserDTO = require("../http/request/UserDTO")

class UserController {

    static async store (req,res) {
        try {
            const {error} = userDTO.validate(req.body)
    
            if(error) {
                return jsonResponse.validationResponse(
                    res, 
                    400, 
                    "Validation Error", 
                    error.details[0].message
                )
            }
    
            const newUserDTO = new userDTO(req.body)
            
            const newUser = await userService.store(newUserDTO);
    
            jsonResponse.successResponse(
                res,
                201,
                "User registered successfully",
                newUser
            )
    
        } catch (error) {
            jsonResponse.errorResponse(
                res,
                500,
                error.message
            )
        }
    }

    static async show(req,res) {
        try {
            const idUser = req.params.id;
            if(idUser == null) {
                return jsonResponse.errorResponse(
                    res,
                    400,
                    "Validation error",
                    "Id is required"
                )
            }
    
            const {id,username, name, email} = await userService.show(idUser)

            const user = new UserDTO({
                id,
                username,
                name,
                email
            })

            jsonResponse.successResponse(
                res,
                200,
                "User exists",
                user
            )
        } catch (error) {
            jsonResponse.errorResponse(
                res,
                500,
                error.message
            )
        }
    } 

}

module.exports = UserController