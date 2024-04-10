const { Notificaciones, User } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
require('dotenv').config();
const sequelize = require('sequelize');

// Controlador para seleccionar notificaciones por UserId
exports.getNotificacionesById = async (req, res) => {
    const { id } = req.params;

    try {
        const notificaciones = await Notificaciones.findAll({
            where: { id },
            include: [{
                model: User,
                attributes: ['nombres', 'apellidos'],
            }]
        });

        if (notificaciones.length > 0) {
            res.status(200).json({
                success: true,
                data: notificaciones
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'No se encontraron notificaciones para el usuario especificado'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Error del servidor'
        });
    }
};
exports.getByUserId = async (req, res, next) => {
    const { UserId } = req.params;

    try {
        const notificaciones = await Notificaciones.findAll({
            where: { UserId },
            include: [{
                model: User,
                attributes: ['nombres', 'apellidos'],
            }],
            order: [['id', 'DESC']] // Ordenar por ID en orden descendente
        });

        if (notificaciones.length > 0) {
            res.status(200).json({
                success: true,
                data: notificaciones
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'No se encontraron notificaciones para el usuario especificado'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: 'Error del servidor'
        });
    }
};




exports.createNotificacion = async (req, res, next) => {

    let notificacion = req.body

    console.log("denuncia " + JSON.stringify(notificacion))

    try {

        const newNotificacion = await Notificaciones.create({
            text: notificacion.text,
            titulo: notificacion.titulo,
            fecha: notificacion.fecha,
            UserId: notificacion.UserId
        });
        res.status(201).json({
            success: true,
            data: newNotificacion
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: {message : err.message}
        });
    }

};
// Controlador para cambiar el estado de una notificaci�n
exports.updateEstado = async (req, res) => {
    let notifica = req.params;

    try {
        let notificacion = await Notificaciones.findByPk(notifica.id);

        if (!notificacion) {
            return res.status(404).json({ error: 'Notificaci�n no encontrada' });
        }

        notificacion.estado = 0; // Actualiza el estado
        await notificacion.save(); // Guarda la notificaci�n actualizada

        res.status(200).json({
            success: true,
            data: notificacion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estado de la notificaci�n' });
    }
};
