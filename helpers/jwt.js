const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (error, token) => {
            if (error) {
                reject('Error de token')
            } else {
                resolve(token);
            }
        });

    });


}

module.exports = {
    generateJWT
}