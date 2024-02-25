const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }
    next();
}

const Profesor = require('../models/profesor');

const validarProfesor = async (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Buscar el usuario en la base de datos
    const usuario = await Profesor.findById(uid);

    // Verificar si el usuario es un profesor
    if (usuario.rol !== 'PROFESOR_ROLE') {
      return res.status(403).json({
        msg: 'No tienes permiso para realizar esta acción'
      });
    }

    // Buscar el profesor en la base de datos y agregar su correo electrónico a la solicitud
    const profesor = await Profesor.findOne({ usuario: uid });
    req.profesor = { email: profesor.email };

    next();
  } catch (error) {
    return res.status(401).json({
      msg: 'Token no válido'
    });
  }
};



module.exports = {
    validarCampos,
    validarProfesor
}