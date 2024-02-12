const { response } = require('express');
const Curso = require('../models/curso');

const cursoPost = async (req,res) => {
    const {NombreMateria, Catedratico, Descripcion, Precio, EstadoCurso} = req.body;
    const curso = new Curso ({NombreMateria, Catedratico, Descripcion, Precio, EstadoCurso});

    await curso.save();
    res.status(200).json({
        curso
    });
}

module.exports = {
    cursoPost
}