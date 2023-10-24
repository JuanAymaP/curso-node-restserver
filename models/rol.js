const {Schema, model} =require('mongoose');

const RolSchema = new Schema({
    rol: {
        type: String,
        required: [true,'EL rol es obligatorio']
    }
});

module.exports = model('Rol',RolSchema,'Roles');
//Singular porque mongoose le añade -s, pero si añade un tercer parametro
//con el nombre de la coleccion que quieres.