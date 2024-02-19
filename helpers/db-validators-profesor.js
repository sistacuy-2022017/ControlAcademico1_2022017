const profesor = require("../models/profesor");

const existProfesorById = async (id = '') => {
    const existProfesor = await profesor.findOne({ id });
    if (existProfesor) {
        throw new Error(`El usuario con el ${id} no existe`);
    }
}

module.exports = {
    existProfesorById
}