const { generarJWT } = require("../helpers/generar-jwt");
const Alumno = require("../models/alumno");
const bcryptjs = require('bcryptjs');
const profesor = require("../models/profesor");

const loginUsers = async (req, res) => {
    const { correo, password } = req.body;
   // const {correoProfe, passwordProfe} = req.body;
    const usuario = await Alumno.findOne({ correo: correo, password: password });
    //const profe = await profesor.findOne({})
    if (!usuario) {
      return res.status(400).json({ msg: "Datos incorrectos" });
    }
  
    const token = await generarJWT(usuario.id);
    res.status(200).json({
      msg: "Acceso concedido",
      token,
    });
  };

module.exports = {

    loginUsers
}