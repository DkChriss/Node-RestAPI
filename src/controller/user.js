const userDTO = require("../http/request/UserDTO")
const userService = require("../service/user")
const jsonResponse = require("../http/response/jsonResponse")

//LIST
const list = async (req,res) => {
    try {

        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                "message": "Error validation",
                errors: errors.array()
            })
        } else {

        }

    } catch (error) {
        res.status(500).send({
            "message": error.message
        })
    }
}

const store = async (req, res) => {
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

module.exports = {
    list,
    store
}