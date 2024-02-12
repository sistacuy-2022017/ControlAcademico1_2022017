const express = require('express');
const { dbConnection } = require('../db/config');
const cors = require('cors');
//const

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.conectarDB();
        this.middlewars();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewars(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor Iniciado insanamente", this.port)
        });
    }

}

module.exports = Server;