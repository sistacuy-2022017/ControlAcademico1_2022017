const Curso = require('../models/curso');
const Role = require('../models/role')


const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({ id });

    if (existeCurso) {
        throw new Error(`el usuario con el ${id} no existe`);
    }
}

const existeCursoByName = async (NombreMateria = '') => {
    const nombreMinusculas = NombreMateria.toLowerCase();

    const existeName = await Curso.findOne({
        NombreMateria: {
            $regex: new RegExp(`^${nombreMinusculas}$`, 'i')
        }
    });

    if (existeName) {
        throw new Error(`La materia con el nombre ${NombreMateria} ya existe`);
    }
}

const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new  Error(`El role ${role} no es un rol valido`);
    }
}

module.exports = {
    existeCursoById,
    existeCursoByName
}