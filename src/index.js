const app = require("./app/app")

const port = process.env.APP_PORT || 3000

app.listen(port, () => {
    console.log("HE IS RUNNING")
})