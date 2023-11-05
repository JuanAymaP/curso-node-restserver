const {response} = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require('../models/usuario')
const {generarJWT} = require("../helpers/generarJWT");
const login = async (req,res = response) => {

    const { correo, password } = req.body;

    try {

        // 1° VERIFICAR SI EL EMAIL EXISTE
        const usuario = await Usuario.findOne({correo});
        if (!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            })
        }
        // 2° VERIFICAR SI EL USUARIO ESTÁ ACTIVO EN LA BASE DE DATOS
        if (usuario.estado === false){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado:false'
            })
        }
        // 3° VERIFICAR LA CONTRASEÑA
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if (validPassword === false){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - passsword'
            })
        }
        // 4° GENERAR EL JSON WEB TOKEN
        const token = await generarJWT( usuario.id );



        res.json({ //NO SE PUEDE EJECUTAR MÁS DE UN RES A LA VEZ
            usuario,
            token
        });

    }catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

module.exports = {
    login
}