const express = require("express")
const app = express()
const router = express.Router()

app.listen(8000, () => {
    console.log("El server ha sido levantado")
})

app.get('/', (req, res) => {
    res.send("Hola")
})