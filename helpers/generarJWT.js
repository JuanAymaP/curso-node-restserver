const jwt = require('jsonwebtoken');

//uid = identificador unico de usuario
//ES RECOMENDABLE QUE EL PAYLOAD DEL JWT SOLO ALMACENE EL UID
const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };

        jwt.sign( payload , process.env.SECRETORPRIVATEKEY, {
            expiresIn:'4h', //365d
        }, ( err, token) => {
            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }else {
                resolve( token );
            }
        });
    });

}
module.exports = {
    generarJWT
}