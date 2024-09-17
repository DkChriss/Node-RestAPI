const router = require("express").Router()
const user = require("../controller/user")
const category = require("../controller/category")

router.post("/user", user.store)
router.get("/user/:id", user.show)
router.put("/user/:id", user.update)
router.delete("/user/:id", user.destroy)

router.post("/category", category.store)
router.get("/category/:id", category.show)
router.put("/category/:id", category.update)
router.delete("/category/:id", category.destroy)

module.exports = router