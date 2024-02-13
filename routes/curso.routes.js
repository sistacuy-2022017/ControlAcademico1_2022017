const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { cursoPost, cursoGet, getCursoById, cursoPut, cursoDelete } = require('../controller/curso.controller');
const { existeCursoById, existeCursoByName } = require('../helpers/db-validators');

const routers = Router();

routers.get(
  "/",
  cursoGet  
);

routers.get(
    "/:id",
    [
        check("id","el id no es un formato valido de MongoDB, pone atención papaito").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ],getCursoById
);


routers.post(
    "/",
    [
        check("NombreMateria", "el nombre es obligatorio").custom(existeCursoByName).not().isEmpty(),
        check("Catedratico", "el nombre de catedratico es obligatorio").not().isEmpty(),
        check("Descripcion", "la descripcion es obligatoria").not().isEmpty(),
        check("Precio", "el precio es obligatorio").not().isEmpty(),
        validarCampos
    ],cursoPost
);

routers.put(
    "/:id",
    [
        check("id", "el id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursoPut
);

routers.delete(
    "/:id",
    [
        check("id", "el id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursoDelete
);

module.exports = routers;