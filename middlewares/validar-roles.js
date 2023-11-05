const {response} = require("express");


const esAdminRol = (req,res=response,next) => {

    //VALIDAR PRIMERO LA REQUEST PARA TENER EN LOS "HEADERS" LA INFORMACION DEL USUARIO
    if ( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    //DESETRUCTURAMOS LAS VARIABLES DEL CAMPO DE LA TABLA DE BASE DE DATOS
    const { rol, nombre } = req.usuario;
    if ( rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`,
        });
    }
    next();
}

const tieneRol = ( ...roles ) => { // '...' resto de argumentos

    return ( req, res=response, next ) => {
        if ( !req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if ( !roles.includes( req.usuario.rol )) {
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`,
            });
        }
        next();
    }
}
module.exports = {
    esAdminRol,
    tieneRol
}