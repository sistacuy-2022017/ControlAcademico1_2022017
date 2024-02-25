const {Schema, model} = require('mongoose');
const cursos = require('./curso');

const ProfesorSchema = Schema({
    NombreProfesor: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    CorreoProfesor: {
        type: String,
        required: [true, 'el correo es obligatorio']
    },
    PasswordProfesor: {
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
        default: 'PROFESOR_ROLE'
    },

    cursos: [{type: Schema.Types.ObjectId, ref: 'cursos'}],
    
    Estado: {
        type: Boolean,
        default: true
    }

});


module.exports = model('Profesor', ProfesorSchema);