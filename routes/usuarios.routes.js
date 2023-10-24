const { Router } = require('express');
const {check} = require("express-validator");

const {validarCampos} = require("../middlewares/validar-campos");
const {esRolValido,emailExiste,existeUsuarioPorId} = require("../helpers/db-validaciones");

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require("../controllers/usuarios.controllers");

const router = Router();

//REST API
//GET: Para crear recursos nuevos.
router.get('/', usuariosGet );

//PUT: Para modificar o actualizar usuario
router.put('/:id', [
    check('id','No es una ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
    ], usuariosPut);

//POST: Para obtener un listado o un recurso en concreto.
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

//PATCH: Para modificar un recurso que no es un recurso de un dato, por ejemplo.
router.patch('/', usuariosPatch);

// DELETE: Para borrar un recurso, un dato por ejemplo de nuestra base de datos.
router.delete('/', usuariosDelete);

module.exports = router;