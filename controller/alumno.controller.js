const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');
const alumno = require('../models/alumno');


/*const alumnoGet = async (req, res = response) => {

}*/

const alumnoPost = async (req, res) => {
    const { NombreAlumno, CorreoAlumno, Password, Edad, Curso } = req.body;
    const alumno = new Alumno({ NombreAlumno, CorreoAlumno, Password, Edad, Curso});

    const salt = bcryptjs.genSaltSync();
    alumno.Password = bcryptjs.hashSync(Password, salt);

    await alumno.save();
    res.status(200).json({
        alumno
    });
}

const alumnoDelete = async (req, res) => {
    const {id} = req.params;
    await Alumno.findByIdAndUpdate(id,{Estado: false});

    const alumno = await Alumno.findOne({_id: id});

    res.status(200).json({
        msg: 'Usuario a eliminar',
        alumno
    });
}



module.exports = {
    alumnoPost,
    alumnoDelete
}