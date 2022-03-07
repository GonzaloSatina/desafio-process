const cfg = require('./config.js')

async function main(){
    const mariaDB = require('knex')(cfg.CONN_MARIA_DB)
    const sqlite = require('knex')(cfg.CONN_SQLITE)

    
    //Creacion tabla Productos
    await mariaDB.schema.createTable('productos', table => {
            // Columnas
            table.increments('id') // Primary Key
            table.string('title')
            table.float('price')
            table.string('thumbnail')
        })
        .then(() => console.log('Tabla de Productos Creada correctamente!'))
        .catch(err => {
            console.log('Error al crear tabla de Productos')
            console.log(err)
        })
        .finally(() => {
            mariaDB.destroy()
        })

        
    //Creacion tabla Mensajes
    await sqlite.schema.createTable('mensajes', table => {
            // Columnas
            table.increments('id') // Primary Key
            table.string('mail')
            table.string('mensaje')
            table.timestamp('fecha')
        })
        .then(() => console.log('Tabla de Mensajes Creada correctamente!'))
        .catch(err => {
            console.log('Error al crear tabla')
            console.log(err)
        })
        .finally(() => {
            sqlite.destroy()
        })
}

main()