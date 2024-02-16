const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos');
const { alumnoPost, alumnoDelete} = require('../controller/alumno.controller');

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

routers.delete(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ],alumnoDelete
);


module.exports = routers;