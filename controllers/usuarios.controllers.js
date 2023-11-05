const { request,response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

//OBTENER USUARIOS
const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = {estado: true};

    /*const usuarios = await Usuario.find(query)
        .skip(Number( desde ))
        .limit(Number( limite ));

    const total = await Usuario.countDocuments(query);*/

    //CONSTANTE PARA CREAR UNA COLECCIÓN DE PROMESAS Y EJECUTAR AMBAS DE FORMA PARALELA
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number( desde ))
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        usuarios
    });
};
//REGISTRAR USUARIO
const usuariosPost = async (req, res = response) => {

    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //ENCRIPTAR LA CONTRASEÑA
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt);

    //GUARDAR EN BD
    await usuario.save();

    res.json({
        message: 'post API - controlador',
        /*nombre,
        edad*/
        usuario
    });
};
//ACTUALIZAR USUARIO
const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if ( password ){
        //ENCRIPTAR LA CONTRASEÑA
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    //DEVOLVEMOS EL USUARIO ACTUALIZADO
    res.json(usuario);
};
const usuariosPatch = async (req, res = response) => {
    res.json({
        message: 'patch API - controlador',
    });
};
const usuariosDelete = async (req, res = response) => {
    const { id } =req.params;

    // FISICAMENTE LO BORRAMOS
    //const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
    //const  usuarioAutenticado = req.usuario;

    res.json(usuario);
    /*res.json({
        message: 'delete API',
        usuario,
        usuarioAutenticado
    });*/
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}