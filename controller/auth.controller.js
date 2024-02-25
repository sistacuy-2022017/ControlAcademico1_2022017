const { generarJWT } = require("../helpers/generar-jwt");
const Alumno = require("../models/alumno");
const bcryptjs = require('bcryptjs');
const profesor = require("../models/profesor");

const loginUsers = async (req, res) => {
  const { CorreoAlumno, Password } = req.body;
  const { CorreoProfesor, PasswordProfesor } = req.body;

  if (CorreoAlumno && Password) {
    const isValidEmailAlumno = CorreoAlumno.includes('@kinal.edu.gt');
    if (isValidEmailAlumno) {
      const usuario = await Alumno.findOne({ CorreoAlumno, Password });
      if (usuario) {
        const token = await generarJWT(usuario.id);
        return res.status(200).json({ msg: "Acceso concedido bienvenido alumno", token });
      }
    }
    return res.status(400).json({ msg: "Datos incorrectos pal alumno metelos bien patojo" });
  }

  if (CorreoProfesor && PasswordProfesor) {
    const isValidEmailProfesor = CorreoProfesor.includes('@org.gt');
    if (isValidEmailProfesor) {
      const profe = await profesor.findOne({ CorreoProfesor, PasswordProfesor });
      if (profe) {
        const token2 = await generarJWT(profe.id);
        return res.status(200).json({ msg: "Acceso concedido bienvenido profesor", token2 });
      }
    }
    return res.status(400).json({ msg: "Datos incorrectos pal profe, por favor metelos bien" });
  }

  return res.status(400).json({ msg: "saber con que tas intentando entrar vo" });
}


module.exports = {

  loginUsers
}