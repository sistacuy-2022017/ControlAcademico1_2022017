const { Router } = require("express");
const { check } = require("express-validator");
//const { correoExiste, existeUsuarioById } = require("../helpers/db-validator");
const  {loginUsers} = require("../controller/auth.controller");
//const { validarCampos } = require("../middlewares/validarCampos");
const router = Router();


router.post(
  "/",
  [
    check("CorreoAlumno", "No es un correo válido").isEmail(),
   // check("correo").custom(correoExiste),
    check("Password", "El password debe ser mayor a 6 caracteres").isLength({
      min: 6,
    }),
  ],
  loginUsers

)


module.exports = router;