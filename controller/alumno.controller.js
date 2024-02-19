const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');
const Curson = require('../models/curso');

const alumnoGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { Estado: true };

    try {
        const [total, alumnos] = await Promise.all([
            Alumno.countDocuments(query),
            Alumno.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate({
                    path: 'cursos',
                    model: 'Curso',
                    select: '-_id NombreMateria Catedratico' // Excluye el campo _id y selecciona todos los demás campos del curso
                })
        ]);
        res.status(200).json({
            total,
            alumnos,
        });
    } catch (error) {
        console.error('Error al obtener los alumnos:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }

}

const getAlumnoById = async (req, res) => {
    const { id } = req.params;
    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        alumno
    });
}

const alumnoPost = async (req, res) => {
    try {
        const { NombreAlumno, CorreoAlumno, Password, Edad, Curso } = req.body;
        let alumno = await Alumno.findOne({ CorreoAlumno });
        const cursito = await Curson.findById(Curso);
        if (!alumno) {
            alumno = new Alumno({ NombreAlumno, CorreoAlumno, Password, Edad });
        }
        if (!cursito) {
            return res.status(404).json({ message: 'El curso no existe papito:c' });
        }
        if (alumno.cursos.includes(Curso)) {
            return res.status(400).json({ message: 'El curso ya está asociado al alumno por favor fijate' });
        }
        if (alumno.cursos.length >= 3) {
            return res.status(400).json({ message: 'El alumno ya tiene el limite de cursos asociados que son 3' });
        }

        alumno.cursos.push(cursito);
        await alumno.save();
        res.status(200).json({ alumno });
    } catch (error) {
        console.error('Error al crear el alumno puro manco:c:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
}


const alumnoDelete = async (req, res) => {
    const { id } = req.params;
    await Alumno.findByIdAndUpdate(id, { Estado: false });

    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        msg: 'Usuario eliminado, se paso de insano',
        alumno
    });
}

const alumnoPut = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    await Alumno.findByIdAndUpdate(id, resto);

    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        msg: 'El alumno se actualizo buena esa insano',
        alumno
    });

}

module.exports = {
    alumnoGet,
    alumnoPost,
    alumnoDelete,
    getAlumnoById,
    alumnoPut
}