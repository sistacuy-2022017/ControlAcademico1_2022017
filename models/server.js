const express = require('express');
const { dbConnection } = require('../db/config');
const cors = require('cors');
//const

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/curso';
        this.alumnoPath = '/api/alumno';
        this.profesorPath = '/api/profesor';
        this.conectarDB();
        this.middlewars();
        this.router();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewars(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    router(){
        this.app.use(this.usuariosPath, require('../routes/curso.routes'));
        this.app.use(this.alumnoPath, require('../routes/alumno.routes'));
        this.app.use(this.profesorPath, require('../routes/profesor.routes'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor Iniciado insanamente", this.port)
        });
    }

}

module.exports = Server;