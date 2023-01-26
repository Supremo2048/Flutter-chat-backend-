const { response } = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generateJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailExists = await Usuario.findOne({email});

        if(emailExists){
            return res.status(400).json({
                msg: 'El correo: '+ email+' ya existe'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generateJWT(usuario.id);

        res.json({
            ok: true, 
            msg: 'Crear Usuario!!!',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador'
        })
    }

}

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }


        // Generar el JWT
        const token = await generateJWT( usuarioDB.id );
        
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Consulte con el administrador'
        })
        
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    const token = await generateJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token
    })

};

module.exports = {
    crearUsuario, login, renewToken
}