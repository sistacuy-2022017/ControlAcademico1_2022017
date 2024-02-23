const {Schema, model} = require('mongoose');
const cursos = require('./curso');

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

    Role: {
        type: String,
        required: true,
        default: 'STUDENT_ROLE'
    },


    cursos: [{type: Schema.Types.ObjectId, ref: 'cursos'}],
    
    Estado: {
        type: Boolean,
        default: true
    }

});

AlumnoSchema.methods.toJSON = function() {
    const {__v, password, _id, ...alumno} = this.toObject();
    alumno.uid = _id;
    return alumno;
}


module.exports = model('Alumno', AlumnoSchema);