const { response } = require('express');
const Curso = require('../models/curso');

const cursoPost = async (req, res) => {
    const { NombreMateria, Catedratico, Descripcion, Precio, EstadoCurso } = req.body;
    const curso = new Curso({ NombreMateria, Catedratico, Descripcion, Precio, EstadoCurso });

    await curso.save();
    res.status(200).json({
        curso
    });
}

const cursoGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { EstadoCurso: true };

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}

const getCursoById = async (req, res = response) => {
    const {id} = req.params;
    const curso = await Curso.findOne({_id: id});

    res.status(200).json({
        curso
    });
}


module.exports = {
    cursoPost,
    cursoGet,
    getCursoById
}