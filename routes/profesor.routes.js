const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existProfesorById } = require('../helpers/db-validators-profesor');
const { getProfesorById, profesorGet, profesorPost, profesorPut, profesorDelete } = require('../controller/profesor.controller');

const routers = Router();

routers.get(
    "/",
    profesorGet
);

routers.get(
    '/:id',
    [
        check('id', 'El id no es un formato valido de MongoDB').isMongoId(),
        check('id').custom(existProfesorById),
    ],getProfesorById
);

routers.post(
    "/",
    [
        check("NombreProfesor","El nombre es obligatorio").not().isEmpty(),
        check("CorreoProfesor","El correo es obligatorio").not().isEmpty(),
        check("PasswordProfesor","El password debe ser mayor a 6 caracteres").isLength({min: 6,}),
        check("Edad","la Edad es una cadena de texto").not().isEmpty(),
        validarCampos
    ], profesorPost
);

routers.put(
    "/:id",
    [
        check('id', 'El id no es un formato valido de MongoDB').isMongoId(),
        check('id', 'El id es obligatorio').not().isEmpty(),
        validarCampos
    ], profesorPut
);

routers.get(
    '/:id',
    [
        check('id', 'El id no es un formato valido de MongoDB').isMongoId(),
        check('id').custom(existProfesorById),
        validarCampos
    ], getProfesorById);

routers.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ], profesorDelete
);


module.exports = routers;