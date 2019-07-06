const express = require("express")
const morgan = require("morgan")
const path = require("path")

// Inicializaciones
const app = express()

// Configuraciones

// Middlewares
app.use(morgan("dev"))
app.use(express.urlencoded({extended: false})) // Para poder aceptar desde los formularios los datos que envíen los usuarios
app.use(express.json()) // Para enviar y recibir JSON

// Variables globales
app.use((req, res, next) => {
    next() // Toma el req, el res y el next continúa con el resto del código
})

// Rutas
app.use(require("./rutas"))
app.use(require("./rutas/autenticacion"))
app.use("/links", require("./rutas/links"))

// Public
app.use(express.static(path.join(__dirname, "public")))

// Iniciando el servidor
app.listen(3000, () => {
    console.log("Servidor encendido, en el puerto 3000")
})