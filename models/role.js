const {Schema, model} = require('mongoose');

const RoleSchema = Schema ({
    Role:{
        type:String,
        required: [true, "El nombre del role es obligatorio"]
    }
});

module.exports = model ('Role', RoleSchema);