const mysql = require('mysql')
const { promisify } = require('util') //Permite convertir código de callbacks a Promises
const { database } = require('./llaves')

const pool = mysql.createPool(database)

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexión con la BD fue cerrada')
        }

        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene muchas conexiones')
        }

        if (err.code === 'ECONNREFUSED') {
            console.error('La conexión de la base de datos fue rechazada')
        }
    }

    if (connection) connection.release()
    console.log('La base de datos está conectada')
    return
})

pool.query = promisify(pool.query) //Cada vez que se quiera hacer una consulta, se puede utilizar Promises

module.exports = pool