const { Reservas, Publicaciones, User, Inmuebles, sequelize  } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
const { Op } = require('sequelize');
require('dotenv').config();

exports.getAll = async (req, res, next) => {

    try {
        const all = await Reservas.findAll({
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

    let status = req.query.status;
    let userId = req.query.userId;
    let publicacionId = req.query.publicacionId;

    let query = {};
    if (status != null && status != undefined) query.status = status;
    if (userId != null && userId != undefined) query.userId = userId;
    if (publicacionId != null && publicacionId != undefined) query.publicacionId = publicacionId;

    try {
        const all = await Reservas.findAll({
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
        res.status(500).json({
            success: false,
            error: "errorServer1"
        });
    }

};

exports.create = async (req, res, next) => {

    let reserva = req.body

    console.log("reserva " + JSON.stringify(reserva))

    try {
        // control rango de fecha
        let fechaInicio = Date.parse(reserva.fechaInicio);
        let fechaFin = Date.parse(reserva.fechaFin);
        console.log(fechaInicio);
        console.log(fechaFin);

        if(isNaN(fechaInicio)){
            throw Error("la fecha de inicio es obligatorio")
        }

        if(isNaN(fechaFin)){
            throw Error("la fecha de fin es obligatorio")
        }

        if(fechaInicio > fechaFin){
            throw Error("la fecha de inicio no puede ser mayor a la fecha fin de la reserva")
        }

        const newReserva = await Reservas.create({
            status: reserva.status,
            PublicacioneId: reserva.PublicacioneId,
            UserId: reserva.UserId,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
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

    let reserva = req.body;

    console.log(reserva.id + " - " + reserva.status)

    try {

        // control rango de fecha
        let fechaInicio = Date.parse(reserva.fechaInicio);
        let fechaFin = Date.parse(reserva.fechaFin);
        console.log(fechaInicio);
        console.log(fechaFin);

        if(isNaN(fechaInicio)){
            throw Error("la fecha de inicio es obligatorio")
        }

        if(isNaN(fechaFin)){
            throw Error("la fecha de fin es obligatorio")
        }

        if(fechaInicio > fechaFin){
            throw Error("la fecha de inicio no puede ser mayor a la fecha fin de la reserva")
        }

        let reservaDB = await Reservas.findOne({
            where: { id: reserva.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        if(reservaDB == null  || reservaDB == undefined){
            throw Error("no existe la reserva que quiere actualizar")
        }

        reservaDB.set({
            id: reserva.id,
            status: reserva.status,
            PublicacioneId: reserva.PublicacioneId,
            UserId: reserva.UserId
        });

        let reservaUpdate = await reservaDB.save();

        res.status(201).json({
            success: true,
            data: reservaUpdate
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

        let reservaDel = await Reservas.destroy({
            where: {
              id: id
            }
        });

        if(reservaDel > 0) {
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
exports.getReservaUser = async (req, res, next) => {
    const userId = req.params.id;

    try {
        const userReservas = await Reservas.findAll({
            where: {
                UserId: userId
            },
            attributes: [
                [sequelize.fn('DATE_FORMAT', sequelize.col('fechaInicio'), '%d-%m-%Y'), 'fechaInicio'],
                [sequelize.fn('DATE_FORMAT', sequelize.col('fechaFin'), '%d-%m-%Y'), 'fechaFin']
            ],
            include: [
                {
                    model: Publicaciones,
                    include: [
                        {
                            model: Inmuebles,
                            attributes: ['id', 'Pais', 'Ciudad', 'Direccion']
                        }
                    ],
                    attributes: ['fechaActiva', 'fechaInActiva', 'costo']
                }
            ]
        });

        res.status(200).json({
            success: true,
            data: userReservas
        });
    } catch (error) {
        // Manejar errores
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};