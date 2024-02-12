const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { cursoPost } = require('../controller/curso.controller');

const routers = Router();

routers.post(
    "/",
    [
        check("NombreMateria", "el nombre es obligatorio").not().isEmpty(),
        check("Catedratico", "el nombre de catedratico es obligatorio").not().isEmpty(),
        check("Descripcion", "la descripcion es obligatoria").not().isEmpty(),
        check("Precio", "el precio es obligatorio").not().isEmpty(),
        validarCampos
    ],cursoPost);

module.exports = routers;