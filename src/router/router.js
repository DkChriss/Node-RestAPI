const router = require("express").Router()
const user = require("../controller/user")

router.post("/user", user.store)
router.get("/user/:id", user.show)
router.put("/user/:id", user.update)
router.delete("/user/:id", user.destroy)

module.exports = router