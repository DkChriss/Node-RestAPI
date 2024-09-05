const router = require("express").Router()
const user = require("../controller/user")

router.post("/user", user.store)

module.exports = router