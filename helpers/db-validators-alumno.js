const existeAlumnoById = async (id = '') => {
    const existAlumno = await Alumno.findOne({ id });
    if (existAlumno) {
        throw new Error(`El usuario con el ${id} no existe`);
    }
}

module.exports = {
    existeAlumnoById
}