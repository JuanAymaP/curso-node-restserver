const { request,response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    //res.send('Hello World!')
    //res.status(400).json({

    const {q,nombre = 'No name',apikey,page = 1,limit} = req.query;

    res.json({
        ok: true,
        message: 'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
};

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
//ACTUALZIAR USUARIO
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


    res.json({
        message: 'put API - controlador',
        id,
        usuario
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        message: 'patch API - controlador',
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        message: 'delete API',
    });
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}