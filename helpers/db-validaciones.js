const Rol = require("../models/rol");
const Usuario = require('../models/usuario');
const {status} = require("express/lib/response");

//VERIFICAR SI EL ROL ES VALIDO
const esRolValido = async (rol = '') => {

    const existeRol = await Rol.findOne( { rol } );
    if (!existeRol){
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

//VERIFICAR SI EL CORREO EXISTE
const emailExiste = async (correo = '') => {

    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail){
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

//VERIFICAR SI EXISTE USUARIO POR ID
const existeUsuarioPorId = async (id = '') => {

    const existeUsuario = await Usuario.findById({ id });
    if (!existeUsuario){
        throw new Error(`El id no existe ${ correo }`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
};