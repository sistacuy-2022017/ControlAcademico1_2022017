const { Router } = require("express");
const { check } = require("express-validator");
const  {loginUsers} = require("../controller/auth.controller");
const router = Router();


router.post(
  "/",
  [
    check("CorreoAlumno", "No es un correo válido").isEmail(),
    check("Password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6,}),
    check("CorreoProfesor", "No es un correo válido").isEmail(),
    check("PasswordProfesor", "El password debe ser mayor a 6 caracteres").isLength({ min: 6,})
  ],
  loginUsers
)


module.exports = router;