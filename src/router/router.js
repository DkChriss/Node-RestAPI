const router = require("express").Router()

router.get("/test", (req,res) => {
    res.send("SEND BY ROUTER")
})

module.exports = router