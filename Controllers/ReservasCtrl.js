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
        const newReserva = await Reservas.create({
            status: reserva.status,
            PublicacioneId: reserva.PublicacioneId,
            UserId: reserva.UserId
        });
        res.status(201).json({
            success: true,
            data: newReserva
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: errorModelUser(err)
        });
    }

};

exports.update = async (req, res, next) => {

    let reserva = req.body;

    console.log(reserva.id + " - " + reserva.status)

    try {
        let reservaDB = await Reservas.findOne({
            where: { id: reserva.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

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
            error: errorModelUser(err)
        });
    }

};

exports.delete = async (req, res, next) => {

    let id  = req.params.id;

    console.log("delete id: " + id)

    try {

        await Reservas.destroy({
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