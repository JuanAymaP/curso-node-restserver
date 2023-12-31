const express = require("express");
const cors = require("cors");
const {dbConnection} = require("../database/config");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';
        this.authPath = '/api/auth';

        //CONECTAR A LA BASE DE DATOS
        this.conectarDB();

        //MIDDLEWARES
        this.middlewares();

        //RUTAS DE MI APLICACIÓN
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use( cors() );

        //LECTURA Y PARSEO DEL BODY
        this.app.use( express.json() );

        //Directorio público '/'
        this.app.use( express.static('public') );
    }
wa
    //ROUTES = RUTAS
    routes(){
        //RECOMENDABLE ORDENAR ALFABETICAMENTE PERO EL AUTH SIEMPRE VA PRIMERO
        this.app.use(this.authPath,require('../routes/auth.routes'));
        this.app.use(this.usuariosRoutePath,require('../routes/usuarios.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        });
    }
}

module.exports = Server;