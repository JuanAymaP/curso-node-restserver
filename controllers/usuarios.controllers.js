const { request,response } = require('express');

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

const usuariosPost = (req, res = response) => {

    //const  body = req.body;
    const  {nombre,edad} = req.body;

    res.json({
        message: 'post API - controlador',
        nombre,
        edad
    });
};

const usuariosPut = (req, res = response) => {

    //const id = req.params.id;
    const { id } = req.params;

    res.json({
        message: 'put API - controlador',
        id
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