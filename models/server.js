const express = require("express");
const cors = require("cors");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';

        //MIDDLEWARES
        this.middlewares();

        //RUTAS DE MI APLICACIÓN
        this.routes();
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
        this.app.use(this.usuariosRoutePath,require('../routes/usuarios.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        });
    }
}

module.exports = Server;