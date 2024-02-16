const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos');
const { alumnoPost} = require('../controller/alumno.controller');

const routers = Router();

/*routers.get(
    "/",

);*/

routers.post(
    "/",
    [

        validarCampos
    ],alumnoPost
);


module.exports = routers;