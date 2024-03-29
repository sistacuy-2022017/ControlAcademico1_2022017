const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'No hay token en la petición'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.profesor = { id: uid };
  } catch (error) {
    return res.status(401).json({
      msg: 'Token no válido'
    });
  }

  next();
};

module.exports = {
  validarJWT
};