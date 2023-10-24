const {validationResult} = require("express-validator");

const validarCampos = (req,res,next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){//Si hay errores
        return res.status(400).json(errors);
    }
    next(); //Si llegamos aqui que continue con el siguiente middleware
}

module.exports = {
    validarCampos:validarCampos,
}