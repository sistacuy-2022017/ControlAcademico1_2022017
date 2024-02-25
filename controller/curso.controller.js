const { response } = require('express');
const Curso = require('../models/curso');
const { existProfesorById } = require('../helpers/db-validators-profesor');
const Alumno = require('../models/alumno');
const profesor = require('../models/profesor');


const cursoPost = async (req, res) => {
    const { NombreMateria, Catedratico, Descripcion, Precio,EstadoCurso } = req.body;
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
    const { id } = req.params;
    const curso = await Curso.findOne({ _id: id });

    res.status(200).json({
        curso
    });
}

/*const cursoPut = async (req, res = response) => {
    const {id} = req.params;
    const { _id, EstadoCurso, ...resto} = req.body;
    await Curso.findByIdAndUpdate(id, resto);

    const  curso = await Curso.findOne({_id: id});

    res.status(200).json({
        msg: "curso modificado insanamente",
        curso
    });
}*/

const cursoPut = async (req, res) => {
    const { id } = req.params;
    const camposActualizar = req.body;

    try {
        const materiaAnterior = await Curso.findById(id);

        if (!materiaAnterior) {
            return res.status(404).json({ msg: "Materia no encontrada" });
        }

        const materiaActualizada = await Curso.findByIdAndUpdate(
            id,
            camposActualizar,
            { new: true }
        );

        // Actualizar el arreglo de materias en el modelo de Alumno
        await Alumno.updateMany(
            { cursos: materiaAnterior._id },
            { $set: { "materias.$": materiaActualizada._id } }
        );

        return res.status(200).json({
            msg: "Materia actualizada exitosamente",
            cursos: materiaActualizada,
        });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }
};


const cursoDelete = async (req, res = response) => {
    const { id } = req.params;
    await Curso.findByIdAndUpdate(id, { EstadoCurso: false });


    const curs = await Curso.findOne({ _id: id });

    res.status(200).json({
        msg: "curso eliminado exitosamente:c",
        curs
    });
}


module.exports = {
    cursoPost,
    cursoGet,
    getCursoById,
    cursoPut,
    cursoDelete
}