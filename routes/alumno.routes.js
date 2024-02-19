const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeAlumnoById } = require('../helpers/db-validators-alumno');
const { alumnoPost, alumnoDelete, alumnoGet, alumnoPut, getAlumnoById } = require('../controller/alumno.controller');

const routers = Router();

routers.get(
    "/",
    alumnoGet
);

routers.get(
    '/:id',
    [
        check('id', 'El id no es un formato valido de MongoDB').isMongoId(),
        check('id').custom(existeAlumnoById),
    ],getAlumnoById
);

routers.post(
    "/",
    [

        validarCampos
    ], alumnoPost
);

routers.put(
    "/:id",
    [
        check('id', 'El id no es un formato valido de MongoDB').isMongoId(),
        check('id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ], alumnoPut
);

routers.get(
    '/:id',
    [
        check('id', 'El id no es un formato valido de MongoDB').isMongoId(),
        check('id').custom(existeAlumnoById),
        validarCampos
    ], getAlumnoById);

routers.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ], alumnoDelete
);


module.exports = routers;