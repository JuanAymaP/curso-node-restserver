const { Router } = require('express');
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require("../controllers/usuarios.controllers");

const router = Router();

//REST API
//GET: Para crear recursos nuevos.
router.get('/', usuariosGet );

//PUT: Para modificar.
router.put('/:id', usuariosPut);

//POST: Para obtener un listado o un recurso en concreto.
router.post('/', usuariosPost );

//PATCH: Para modificar un recurso que no es un recurso de un dato, por ejemplo.
router.patch('/', usuariosPatch);

// DELETE: Para borrar un recurso, un dato por ejemplo de nuestra base de datos.
router.delete('/', usuariosDelete);

module.exports = router;