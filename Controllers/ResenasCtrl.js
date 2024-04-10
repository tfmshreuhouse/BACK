const { Resenas, Reservas, User } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
    try {
        const all = await Resenas.findAll({
            order: [
                ['updatedAt', 'ASC'],
            ],
            include: [{ model: Reservas }, { model: User }]
        });
        res.status(200).json({
            success: true,
            data: all
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Error interno del servidor"
        });
    }
};

exports.getByReservaId = async (req, res, next) => {
    const { reservaId } = req.params;
    try {
        const reseñas = await Resenas.findAll({
            where: { ReservaId: reservaId }
        });
        res.status(200).json({
            success: true,
            data: reseñas
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Error interno del servidor"
        });
    }
};

exports.createResena = async (req, res, next) => {
    try {
        const { descripcion, rating, ReservaId, UserId } = req.body;

        const nuevaResena = await Resenas.create({
            descripcion: descripcion,
            rating: rating,
            ReservaId: ReservaId,
            UserId: UserId
        });
        res.status(201).json({
            success: true,
            data: nuevaResena
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: { message: err.message }
        });
    }
};
