const { Router } = require('express');
const {check} = require("express-validator");

/*const {validarCampos} = require("../middlewares/validar-campos");
const {validarJWT} = require("../middlewares/validar-jwt");
const {esAdminRol, tieneRol} = require("../middlewares/validar-roles");*/
const {
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRol
} = require('../middlewares')


const {esRolValido,emailExiste,existeUsuarioPorId} = require("../helpers/db-validaciones");

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require("../controllers/usuarios.controllers");

const router = Router();

//REST API
//GET: Solicita un recurso específico del servidor.
router.get('/', usuariosGet );

//PUT: Actualiza un recurso existente en el servidor.
router.put('/:id', [
    check('id','No es un MongoID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
    ], usuariosPut);

//POST: Envía datos al servidor para ser procesados.
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y de más de 6 letras').isLength({min:6}),
    check('correo', 'El valor ingresado no tiene el aspecto de un correo').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    //check('rol').custom( (rol) => esRolValido(rol) ),
    check('rol').custom( esRolValido ),
    validarCampos //Ejecutar el middleware para revisar los errores
    ],usuariosPost );

//PATCH: Modifica parcialmente un recurso existente.
router.patch('/', usuariosPatch);

// DELETE: Elimina un recurso del servidor.
router.delete('/:id',[ //LAS VALIDACIONES SE HACEN SECUENCIALMENTE
    validarJWT,
    //esAdminRol, //VERIFICA SOLO SI TIENE ADMIN_ROL
    tieneRol('ADMIN_ROL','VENTAS_ROL','OTRO_ROL'), //ESTE ES MÁS FLEXIBLE
    check('id','No es un MongoID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete);

module.exports = router;