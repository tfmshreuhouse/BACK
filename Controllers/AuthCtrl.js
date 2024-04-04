const { User } = require('../models');
const { TokenControl } = require('../models');
const { Programas } = require('../models');
const { ProgramasOverride } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
const { helperCompararUser, helperCreateToken, helperValidarAccesos } = require('../Helpers/AuthHelper');
const { middlewareValidarToken } = require('../Middleware/authMiddleware');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.getALLUsers = async (req, res, next) => {

    try {
        const allUsers = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [
                ['nombres', 'ASC'],
            ]
        });
        res.status(200).json({
            success: true,
            data: allUsers
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "errorServer1"
        });
    }

};

exports.getTokenInfo = async (req, res, next) => {

    try {
        const tokenInfo = await middlewareValidarToken(req.query.token);
        //console.log(tokenInfo);

        function removeSubkey(obj, keyToRemove) {
            for (const prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (typeof obj[prop] === 'object') {
                        removeSubkey(obj[prop], keyToRemove);
                    } else if (prop === keyToRemove) {
                        delete obj[prop];
                    }
                }
            }
        }
        //removeSubkey(tokenInfo, "userID");

        if (tokenInfo.success) {
            res.status(200).json(tokenInfo);
        } else {
            res.status(400).json(tokenInfo);
        }
    } catch (error) {
        res.status(400).json(tokenInfo);
    }

};

exports.getAccesoPrograma = async (req, res, next) => {

    const {token, programa} = req.query;

    try {
        const tokenInfo = await middlewareValidarToken(token);
        //const userID = tokenInfo.data.userID;
        //console.log(userID);
        if (tokenInfo.success) {
            const userID = tokenInfo.data.userID;
            const Usuario = await User.findOne({
                where: { id: userID },
                attributes: ['perfil'],
            });
            const perfil = Usuario.perfil;
            const queryAccesoPrograma = await Programas.findOne({
                where: { nombrePrograma: programa },
                attributes: [`${perfil}`],
            });
            const queryAccesoProgramaOverride = await ProgramasOverride.findOne({
                where: { nombrePrograma: programa, UserId: userID },
                attributes: ['acceso'],
            });

            res.status(200).json({
                success: true,
                //tokenInfo: tokenInfo,
                //userID: userID,
                //perfil: perfil,
                //accesoPrograma: accesoPrograma,
                //accesoProgramaOverride: accesoProgramaOverride,
                permitido: helperValidarAccesos(queryAccesoPrograma, queryAccesoProgramaOverride, perfil)
            });
        } else {
            res.status(500).json({
                success: false,
                error: tokenInfo.error
            });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err
        });
    }

};

exports.postCreateUser = async (req, res, next) => {

    const { nombres, apellidos, correo, telefono, password, perfil, status } = req.body;

    try {
        const newUser = await User.create({
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            telefono: telefono,
            password: password,
            perfil: perfil,
            status: status
        });
        res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: errorModelUser(err)
        });
    }

};

exports.postLoginUser = async (req, res, next) => {

    const { correo, password } = req.body;

    try {
        const Usuario = await User.findOne({
            where: { correo: correo, status: 1 },
            attributes: ['id', 'password', 'perfil'],
        });
        console.log(Usuario)
        if (Usuario !== undefined || Usuario !== null) {
            const auth = await bcrypt.compare(password, Usuario.password);
            if (auth) {
                const token = helperCreateToken(Usuario.id, Usuario.perfil);
                try {
                    const registrarToken = await TokenControl.create({
                        token: token,
                        status: 1
                    });
                } catch (error) {
                    res.status(400).json({
                        success: false,
                        error: "errorAuth6"
                    });
                }
                res.status(201).json({
                    success: true,
                    data: token
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: "errorAuth3"
                });
            }
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            error: "errorAuth8"
        });
    }

};

exports.getLogoutUser = async (req, res) => {

    try {
        const token = req.query.token;
        //console.log(token);
        const deshabilitarToken = await TokenControl.update({ status: 0 }, {
            where: {
                token: token
            }
        });
        console.log(deshabilitarToken);
        if (deshabilitarToken[0] === 1) {
            res.status(201).json({
                success: true,
                data: "Session finalizada",
                token: token
            });
        } else {
            res.status(400).json({
                success: false,
                error: "errorAuth7"
            });
        }
    } catch (err) {
        res.status(400).json({
            success: false,
            error: "errorServer2"
        });
    }
}

exports.putUpdateUserInfo = async (req, res, next) => {

    const userReq = {
        id: req.body.id,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        telefono: req.body.telefono,
        perfil: req.body.perfil,
        status: req.body.status
    }

    try {
        const userDB = await User.findOne({
            where: { id: userReq.id },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });

        const userNew = helperCompararUser(userReq, userDB);

        userDB.set({
            id: userNew.id,
            nombres: userNew.nombres,
            apellidos: userNew.apellidos,
            correo: userNew.correo,
            perfil: userNew.perfil,
            status: userNew.status
        });

        const userUpdate = await userDB.save();

        res.status(201).json({
            success: true,
            data: userUpdate
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: errorModelUser(err)
        });
    }
};

exports.getUserById = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const user = await User.findByPk(userId, {
            attributes: { exclude: ['password'] }
        });
        if (user) {
            res.status(200).json({
                success: true,
                data: user
            });
        } else {
            res.status(404).json({
                success: false,
                error: "Usuario no encontrado"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "Error del servidor"
        });
    }
};
