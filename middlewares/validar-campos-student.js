const alumno = require('../models/alumno');
const Curso = require('../models/curso');
const Role = require('../models/role');


const existeAlumnoByCorreo = async (CorreoAlumno = '') => {
    const nombreMinusculas = CorreoAlumno.toLowerCase();

    const existeName = await alumno.findOne({
        CorreoAlumno: {
            $regex: new RegExp(`^${nombreMinusculas}$`, 'i')
        }
    });

    if (existeName) {
        throw new Error(`el usuario con el nombre ${CorreoAlumno} ya existe`);
    }
}


module.exports = {
    existeAlumnoByCorreo
}