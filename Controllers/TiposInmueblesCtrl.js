const { TiposInmuebles } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
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
        if(tipo == null  || tipo == undefined || tipo == ""){
            throw Error("tipo de inmueble invalido")
        }
        const newInmueble = await TiposInmuebles.create({
            tipo: tipo
        });
        res.status(201).json({
            success: true,
            data: newInmueble
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: { message: err.message}
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
        if(tipoInmuebleReq.tipo == null  || tipoInmuebleReq.tipo == undefined || tipoInmuebleReq.tipo == ""){
            throw Error("tipo de inmueble invalido")
        }

        if(tipoInmuebleReq.id == null  || tipoInmuebleReq.id == undefined || tipoInmuebleReq.id == ""){
            throw Error("debe existir un id a actualizar")
        }

        let tipoInmuebleDB = await TiposInmuebles.findOne({
            where: { id: tipoInmuebleReq.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        if(tipoInmuebleDB == null  || tipoInmuebleDB == undefined){
            throw Error("no existe el tipo inmueble que quiere actualizar")
        }

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
            error: { message: err.message }
        });
    }

};

exports.delete = async (req, res, next) => {

    let id  = req.params.id;

    console.log("delete id: " + id)

    try {

        let deleteRes = await TiposInmuebles.destroy({
            where: {
              id: id
            }
          });

        console.log(deleteRes);

        if(deleteRes > 0) {
            res.status(200).json({
                success: true
            });
        } else {
            res.status(200).json({
                success: false,
                error: {message: "No existe el registro para eliminar"}
            }); 
        }

        
    } catch (err) {
        res.status(400).json({
            success: false,
            error: errorModelUser(err)
        });
    }

};