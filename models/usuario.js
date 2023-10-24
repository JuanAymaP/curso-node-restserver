const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROL', 'USER_ROL','SUPER_ROL', 'VENTAS_ROL']
    },
    estado: {
        type: Boolean,
        default:true
    },
    google: {
        type: Boolean,
        default:false
    },
});

//ELIMINAR CONTRASEÑA Y VERSION
UsuarioSchema.methods.toJSON = function () {
    const { __v,password,...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema,'Usuarios');

//Singular porque mongoose le añade -s, pero si añade un tercer parametro
//con el nombre de la coleccion que quieres.