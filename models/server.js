const express = require('express');
//const cors = require('cors');
//const

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor Iniciado insanamente", this.port)
        });
    }

}

module.exports = Server;