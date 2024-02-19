const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Profesor = require('../models/profesor');
const Curson = require('../models/curso');

const profesorGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { Estado: true };

    try {
        const [total, profesor] = await Promise.all([
            Profesor.countDocuments(query),
            Profesor.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate({
                    path: 'cursos',
                    model: 'Curso',
                    select: '-_id NombreMateria Catedratico' 
                })
        ]);
        res.status(200).json({
            total,
            profesor
        });
    } catch (error) {
        console.error('Error al obtener los profesores:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }

}

const getProfesorById = async (req, res) => {
    const { id } = req.params;
    const profesor = await Profesor.findOne({ _id: id });

    res.status(200).json({
        profesor
    });
}

const profesorPost = async (req, res) => {
    try {
        const { NombreProfesor, CorreoProfesor, Password, Edad, Curso } = req.body;
        let profesor = await Profesor.findOne({ CorreoProfesor });
        const cursito = await Curson.findById(Curso);
        if (!profesor) {
            profesor = new Profesor({  NombreProfesor, CorreoProfesor, Password, Edad});
        }
        if (!cursito) {
            return res.status(404).json({ message: 'El curso no existe papito:c' });
        }
        if (profesor.cursos.includes(Curso)) {
            return res.status(400).json({ message: 'El curso ya está asociado al profesor por favor fijate' });
        }
        if (profesor.cursos.length >= 3) {
            return res.status(400).json({ message: 'El profe ya tiene el limite de cursos asociados que son 3' });
        }

        profesor.cursos.push(cursito);
        await profesor.save();
        res.status(200).json({ profesor });
    } catch (error) {
        console.error('Error al crear el profe puro manco:c:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}


const profesorDelete = async (req, res) => {
    const { id } = req.params;
    await Profesor.findByIdAndUpdate(id, { Estado: false });

    const profesor = await Profesor.findOne({ _id: id });

    res.status(200).json({
        msg: 'Profe eliminado, se paso de joya',
        profesor
    });
}

const profesorPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    await Profesor.findByIdAndUpdate(id, resto);

    const profesor = await Profesor.findOne({ _id: id });

    res.status(200).json({
        msg: 'El profe se actualizo buena esa insano',
        profesor
    });

}

module.exports = {
    profesorGet,
    profesorPost,
    profesorDelete,
    getProfesorById,
    profesorPut
}