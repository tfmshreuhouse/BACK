const { Reservas, Publicaciones, User, Inmuebles, sequelize, TiposInmuebles, ImagnenesInmuebles, Resenas } = require('../models');
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
    const estado = req.query.estado; 

    Publicaciones.hasMany(Reservas, { foreignKey: 'PublicacioneId' });
    Inmuebles.hasMany(ImagnenesInmuebles, { foreignKey: 'InmuebleId' });

    try {
        let whereClause = { UserId: userId };
        
        if (estado) {
            whereClause.estado = estado;
        }

        const userReservas = await Reservas.findAll({
            where: whereClause,
            attributes: [
                'id',
                [sequelize.fn('DATE_FORMAT', sequelize.col('fechaInicio'), '%Y-%m-%d'), 'fechaInicio'],
                [sequelize.fn('DATE_FORMAT', sequelize.col('fechaFin'), '%d-%m-%Y'), 'fechaFin']
            ],
            include: [
                {
                    model: Publicaciones,
                    include: [
                        {
                            model: Inmuebles,
                            attributes: ['id', 'Nombre','Pais', 'Ciudad', 'Direccion'],
                            include: [
                                {
                                  model: ImagnenesInmuebles,
                                  attributes:['URL', 'status'],
                                  //where: { status: 1 }
                                }
                            ]
                        }
                    ],
                    attributes: ['id', 'fechaActiva', 'fechaInActiva', 'costo', 'moneda']
                }
            ]
        });

        const reservasConIds = userReservas.map(reserva => ({
            reservaId: reserva.id,
            inmuebleId: reserva.Publicacione.Inmueble.id,
            fechaInicio: reserva.fechaInicio,
            fechaFin: reserva.fechaFin,
            fechaActiva: reserva.Publicacione.fechaActiva,
            fechaInActiva: reserva.Publicacione.fechaInActiva,
            costo: reserva.Publicacione.costo,
            moneda: reserva.Publicacione.moneda,
            direccion: reserva.Publicacione.Inmueble.Direccion,
            pais: reserva.Publicacione.Inmueble.Pais,
            ciudad: reserva.Publicacione.Inmueble.Ciudad,
            nombreInmueble: reserva.Publicacione.Inmueble.Nombre,
            Url: reserva.Publicacione.Inmueble.ImagnenesInmuebles[0].URL
        }));

        res.status(200).json({
            success: true,
            data: reservasConIds
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getMisReservas = (req, res, next) => {

    const userId = req.query.userId; 

    Publicaciones.hasMany(Reservas, { foreignKey: 'PublicacioneId' });
    Inmuebles.hasMany(ImagnenesInmuebles, { foreignKey: 'InmuebleId' });

    Publicaciones.findAll({
    include: [
        {
            model: Reservas,
            required: true, 
            duplicating: false,
            where: { UserId: userId },
            attributes: [
                [sequelize.fn('DATE_FORMAT', sequelize.col('fechaInicio'), '%d-%m-%Y'), 'fechaInicio'],
                [sequelize.fn('DATE_FORMAT', sequelize.col('fechaFin'), '%d-%m-%Y'), 'fechaFin'],
                [sequelize.fn('DATE_FORMAT', sequelize.col('Reservas.createdAt'), '%d-%m-%Y'), 'createdAt'],
                [sequelize.literal('DATEDIFF(fechaFin, fechaInicio)'), 'dias'],
                'id', 'status', 'UserId'
            ],
            order: [
                ['dias', 'fechaInicio'],
            ],
        },
        {
            model: Inmuebles,
            attributes:['Nombre', 'Pais', 'Ciudad', 'Direccion', 'UserId'],
            include: [
                {
                  model: ImagnenesInmuebles,
                  attributes:['URL', 'status'],
                  //where: { status: 1 }
                },
                {
                    model: User,
                    attributes:['id', 'nombres', 'apellidos', 'correo', 'telefono'],
                    //where: { status: 1 }
                },
            ],
        },
    ],
    group: ['Publicaciones.id']
    }).then((publicaciones) => {
        console.log(publicaciones);
        res.status(200).json({
            success: true,
            data: publicaciones
        });
    }).catch((err) => {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "errorServer1"
        });
    });

};

exports.getReservasEnMisInmuebles = (req, res, next) => {

    const userId = req.query.userId; 

    Publicaciones.hasMany(Reservas, { foreignKey: 'PublicacioneId' });
    Inmuebles.hasMany(ImagnenesInmuebles, { foreignKey: 'InmuebleId' });

    Publicaciones.findAll({
    include: [
        {
            model: Reservas,
            required: true,
            include: [{
                model: User,
                attributes:['id','nombres', 'apellidos', 'correo', 'telefono'],
                //where: { status: 1 }
            }],
            attributes: [
                [sequelize.fn('DATE_FORMAT', sequelize.col('fechaInicio'), '%d-%m-%Y'), 'fechaInicio'],
                [sequelize.fn('DATE_FORMAT', sequelize.col('fechaFin'), '%d-%m-%Y'), 'fechaFin'],
                [sequelize.fn('DATE_FORMAT', sequelize.col('Reservas.createdAt'), '%d-%m-%Y'), 'createdAt'],
                [sequelize.literal('DATEDIFF(fechaFin, fechaInicio)'), 'dias'],
                'id', 'status', 'UserId'
            ],
            where: {
                fechaInicio: {
                    [Op.gte]: new Date() // Solo considera reservas con fecha de inicio igual o posterior a la actual
                },
                status : 1
            },
            order: [
                ['dias', 'fechaInicio'],
            ],
            group: [
                sequelize.literal('DATE_FORMAT(fechaInicio, "%d-%m-%Y")'), // Agrupa por fecha de inicio formateada
            ],
        },
        {
            model: Inmuebles,
            attributes:['Nombre', 'Pais', 'Ciudad', 'Direccion', 'UserId'],
            include: [
                {
                  model: ImagnenesInmuebles,
                  attributes:['URL', 'status']
                },
            ],
            where: { UserId: userId }
        },
    ]
    }).then((publicaciones) => {
        console.log(publicaciones);
        res.status(200).json({
            success: true,
            data: publicaciones
        });
    }).catch((err) => {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "errorServer1"
        });
    });

};

exports.getReservasEnMisInmuebles2 = async (req, res, next) => {

    const { userId, inmuebleId } = req.query;
    console.log(req.query);

    const allReservas = [];
    const allResenas = [];

    try {
        const allPublicaciones = await Publicaciones.findAll({
            attributes: ['id'],
            where: {
                InmuebleId: inmuebleId
            }
        });
        for (let i = 0; i < allPublicaciones.length; i++) {
            //console.log(allPublicaciones[i].id);
            const Reserva = await Reservas.findAll({
                attributes: ['id'],
                where: { PublicacioneId: allPublicaciones[i].id }
            });
            //console.log(Reserva);
            allReservas.push(...Reserva);
        }
        //console.log(allReservas);
        for (let i = 0; i < allReservas.length; i++) {
            //console.log(allReservas[i].dataValues.id);
            const Resena = await Resenas.findAll({
                where: { ReservaId: allReservas[i].dataValues.id }
            });
            //console.log(Resena);
            allResenas.push(...Resena);
        }
        for (let i = 0; i < allResenas.length; i++) {
            //console.log(allResenas[i].id);
            const UserName = await User.findAll({
                where: { id: allResenas[i].UserId }
            });
            //console.log(UserName);
            console.log(allResenas[i].UserId);
            allResenas[i].UserId = UserName[0].dataValues.nombres + " " + UserName[0].dataValues.apellidos;
        }
        res.status(200).json({
            success: true,
            data: allResenas
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: "errorServer1"
        });
    }

};

exports.changeStatusReserva = async (req, res, next) => {

    let id = req.query.id;
    let status = req.query.status;

    console.log(id + " - " + status)

    try {

        let reservaDB = await Reservas.findOne({
            where: { id: id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        if(reservaDB == null  || reservaDB == undefined){
            throw Error("no existe la reserva que quiere actualizar")
        }

        if(status != null  && status != undefined){
            reservaDB.status = status
        }

        reservaDB.set(reservaDB);

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