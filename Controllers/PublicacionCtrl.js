const { Publicaciones, Inmuebles } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
require('dotenv').config();

exports.getAll = async (req, res, next) => {

    try {
        const all = await Publicaciones.findAll({
            order: [
                ['fechaActiva', 'ASC'],
            ]
        });
        res.status(200).json({
            success: true,
            data: all
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "errorServer1 " + err
        });
    }

};

exports.create = async (req, res, next) => {

    let publicacion = req.body;

    try {
        const newPublicacion = await Publicaciones.create({
            fechaActiva: publicacion.fechaActiva,
            fechaInActiva: publicacion.fechaInactiva,
            PAX: publicacion.PAX,
            moneda: publicacion.moneda,
            costo: publicacion.costo,
            descripcion: publicacion.descripcion,
            indicaciones: publicacion.indicaciones,
            status: publicacion.status,
            InmuebleId: publicacion.Inmuebles
        });

        res.status(201).json({
            success: true,
            data: newPublicacion
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: errorModelUser(err) + err
        });
    }

};

exports.update = async (req, res, next) => {

    let publicacion = req.body;

    try {
        let publicacionDB = await Publicaciones.findOne({
            where: { id: publicacion.id }
        });

        publicacionDB.set({
            id: publicacion.id,
            fechaActiva: publicacion.fechaActiva,
            fechaInactiva: publicacion.fechaInactiva, 
            PAX: publicacion.PAX,
            moneda: publicacion.moneda,
            costo: publicacion.costo, 
            descripcion: publicacion.descripcion, 
            indicaciones: publicacion.indicaciones, 
            status: publicacion.status, 
            InmuebleId: publicacion.Inmuebles
        });

        console.log(publicacionDB);

        let publicacionUpdate = await publicacionDB.save();

        res.status(201).json({
            success: true,
            data: publicacionUpdate
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: errorModelUser(err) + err
        });
    }

};

exports.get = async (req, res, next) => {

    let id  = req.params.id;

    try {
        const all = await Publicaciones.findOne({
            where: {
                InmuebleId: id
              }
        });
        res.status(200).json({
            success: true,
            data: all
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "errorServer1 " + err
        });
    }
};
    
exports.changeStatusPublicacion = async (req, res, next) => {

    let id = req.query.id;
    let status = req.query.status;

    console.log(id + " - " + status)

    try {

        let publicacionDB = await Publicaciones.findOne({
            where: { id: id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        if(publicacionDB == null  || publicacionDB == undefined){
            throw Error("no existe la publicacion que quiere actualizar")
        }

        if(status != null  && status != undefined){
            publicacionDB.status = status
        }

        publicacionDB.set(publicacionDB);

        let publicacionUpdate = await publicacionDB.save();

        res.status(201).json({
            success: true,
            data: publicacionUpdate
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: { message: err.message }
        });
    }
};