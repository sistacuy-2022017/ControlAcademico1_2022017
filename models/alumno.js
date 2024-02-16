const {Schema, model} = require('mongoose');

const AlumnoSchema = Schema({
    NombreAlumno: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    CorreoAlumno: {
        type: String,
        required: [true, 'el correo es obligatorio']
    },
    Password: {
        type: String,
        required: [true, 'el password es obligatorio']
    },
    Edad: {
        type: String,
        required: [true, 'la edad es obligatoria']
    },
    Curso: {
        type: String,
        required: [true, 'el nombre del curso es obligatorio']
    },
    Estado: {
        type: Boolean,
        default: true
    }

});


module.exports = model('Alumno', AlumnoSchema);