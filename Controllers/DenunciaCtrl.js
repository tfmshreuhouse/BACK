const { Denuncias, Publicaciones, User } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
require('dotenv').config();

exports.getAll = async (req, res, next) => {

    try {
        const all = await Denuncias.findAll({
            order: [
                ['updatedAt', 'ASC'],
            ],
            include: [{ model: Publicaciones },
                      { model: User}]
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

exports.getFilter = async (req, res, next) => {

    let motivo = req.query.motivo;
    let userId = req.query.userId;
    let publicacionId = req.query.publicacionId;

    let query = {};
    if (motivo != null && motivo != undefined) query.motivo = motivo;
    if (userId != null && userId != undefined) query.userId = userId;
    if (publicacionId != null && publicacionId != undefined) query.publicacionId = publicacionId;

    try {
        const all = await Denuncias.findAll({
            order: [
                ['updatedAt', 'ASC'],
            ],
            where: query,
            include: [{ model: Publicaciones },
                      { model: User}]
        });
        res.status(200).json({
            success: true,
            data: all
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "errorServer1"
        });
    }

};

exports.create = async (req, res, next) => {

    let denuncia = req.body

    console.log("denuncia " + JSON.stringify(denuncia))

    try {

        const newReserva = await Denuncias.create({
            motivo: denuncia.motivo,
            justificacion: denuncia.justificacion,
            PublicacioneId: denuncia.PublicacioneId,
            UserId: denuncia.UserId
        });
        res.status(201).json({
            success: true,
            data: newReserva
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: {message : err.message}
        });
    }

};

exports.update = async (req, res, next) => {

    let denuncia = req.body;

    console.log(denuncia.id + " - " + denuncia.motivo)

    try {

        let denunciaDB = await Denuncias.findOne({
            where: { id: denuncia.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        if(denunciaDB == null  || denunciaDB == undefined){
            throw Error("no existe la denuncia que quiere actualizar")
        }

        if(denuncia.motivo != null  && denuncia.motivo != undefined){
            denunciaDB.motivo = denuncia.motivo
        }

        if(denuncia.justificacion != null  && denuncia.justificacion != undefined){
            denunciaDB.justificacion = denuncia.justificacion
        }

        if(denuncia.PublicacioneId != null  && denuncia.PublicacioneId != undefined){
            denunciaDB.PublicacioneId = denuncia.PublicacioneId
        }

        if(denuncia.UserId != null  && denuncia.UserId != undefined){
            denunciaDB.UserId = denuncia.UserId
        }

        denunciaDB.set(denunciaDB);

        let denunciaUpdate = await denunciaDB.save();

        res.status(201).json({
            success: true,
            data: denunciaUpdate
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

        let denunciaDel = await Denuncias.destroy({
            where: {
              id: id
            }
        });

        if(denunciaDel > 0) {
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
            error: { message: err.message }
        });
    }

};