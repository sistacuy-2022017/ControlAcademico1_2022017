const {Schema, model} = require('mongoose');

const CursoSchema = Schema ({
    NombreMateria: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    Catedratico: {
        type: String,
        required: [true, 'el nombre del catedratico es obligatorio']
    },
    Descripcion: {
        type: String,
        required: [true, 'la descripcion es obligatoria']
    },
    Precio: {
        type: String,
        required: [true, 'el precio del curso es obligatorio']
    },
    EstadoCurso: {
        type: Boolean,
        default: true
    }

});

module.exports = model('Curso', CursoSchema);