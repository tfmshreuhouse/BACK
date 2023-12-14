const { TiposInmuebles } = require('../models');
const { TokenControl } = require('../models');
const { Programas } = require('../models');
const { ProgramasOverride } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
const { helperCompararUser, helperCreateToken, helperValidarAccesos } = require('../Helpers/AuthHelper');
const { middlewareValidarToken } = require('../Middleware/authMiddleware');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.getAll = async (req, res, next) => {

    try {
        const all = await TiposInmuebles.findAll({
            order: [
                ['tipo', 'ASC'],
            ]
        });
        res.status(200).json({
            success: true,
            data: all
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "errorServer1"
        });
    }

};

exports.create = async (req, res, next) => {

    let tipo = req.query.tipo;

    console.log("tipo " + tipo)

    try {
        const newUser = await TiposInmuebles.create({
            tipo: tipo
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

exports.update = async (req, res, next) => {

    let tipoInmuebleReq = {
        id: req.body.id,
        tipo: req.body.tipo,
    }

    console.log(tipoInmuebleReq.id + " - " + tipoInmuebleReq.tipo)

    try {
        let tipoInmuebleDB = await TiposInmuebles.findOne({
            where: { id: tipoInmuebleReq.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        tipoInmuebleDB.set({
            id: tipoInmuebleReq.id,
            tipo: tipoInmuebleReq.tipo
        });

        let tipoInmuebleUpdate = await tipoInmuebleDB.save();

        res.status(201).json({
            success: true,
            data: tipoInmuebleUpdate
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: errorModelUser(err)
        });
    }

};

exports.delete = async (req, res, next) => {

    let id  = req.params.id;

    console.log("delete id: " + id)

    try {

        await TiposInmuebles.destroy({
            where: {
              id: id
            }
          });

        res.status(200).json({
            success: true
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: errorModelUser(err)
        });
    }

};