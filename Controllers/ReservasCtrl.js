const { Reservas, Publicaciones, User } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
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