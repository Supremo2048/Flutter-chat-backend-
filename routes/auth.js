/*
    path: api/login
*/ 

const {Router} = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validate-jwt');



const router = Router();

//Crear Usuario
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'el password debe al menos de 4 digitos').isLength({ min: 4 }),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
],crearUsuario);

//Login
router.post('/', [
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
],
login);

//renovar token
router.get('/renew', validateJWT,  renewToken);

module.exports = router;