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

//ELIMINAR CONTRASEÑA, VERSION Y REEMPLAZAR EL _ID POR DEFECTO DE MONGO POR EL UID
UsuarioSchema.methods.toJSON = function () {
    const { __v,password,_id,...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema,'Usuarios');

//Singular porque mongoose le añade -s, pero si añade un tercer parametro
//con el nombre de la coleccion que quieres.