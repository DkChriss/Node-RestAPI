const app = require("./app/app")
const database = require("./app/database")

const PORT = process.env.APP_PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})