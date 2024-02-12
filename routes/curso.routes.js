const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { cursoPost } = require('../controller/curso.controller');

const routers = Router();

routers.post(
    "/",
    [
        check("NombreMateria", "el nombre es obligatorio").not().isEmpty(),
        
    ],cursoPost
);

module.exports = routers;