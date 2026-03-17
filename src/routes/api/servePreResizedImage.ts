import express from "express"

const routes = express.Router()

routes.get("/", (req, res) => {
    res.send("Serve Pre-Resized Image")
})

export default routes