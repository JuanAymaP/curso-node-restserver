const jwt = require('jsonwebtoken');
const {response, request} = require("express");

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    //USUALMENTE SE ESPERA ENCONTRAR EN LOS HEADER DE LA REQUEST
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        //const payload = jwt.verify( token , process.env.SECRETORPRIVATEKEY);

        //OBTENER EL UID DEL PAYLOAD VERIFICADO
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //OBTENER EL USUARIO QUE CORRESPONDE AL UID
        const usuario = await Usuario.findById( uid );

        //VALIDAR QUE EL USUARIO NO SEA UNDEFINE
        if ( !usuario){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            });
        }

        //VERIFICAR SI EL UIA TIENE ESTADO TRUE
        if ( !usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }

        //ALMACENAR EN LA REQUEST EL USUARIO CON LA VARIABLE "usuario"
        req.usuario = usuario;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

module.exports = {
    validarJWT
}