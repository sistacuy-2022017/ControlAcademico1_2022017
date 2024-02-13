const Curso = require('../models/curso');

const existeCursoById = async (id='') => {
    const existeCurso = await Curso.findOne({id});

    if(existeCurso){
        throw new Error(`el usuario con el ${id} no existe`);
    }
}

module.exports = {
    existeCursoById
}