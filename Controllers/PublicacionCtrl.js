const { Publicaciones, Inmuebles, ImagnenesInmuebles } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
require('dotenv').config();
const sequelize = require('sequelize');
const { Op } = require('sequelize');

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

exports.getPublicacionesHomeFilter = (req, res, next) => {

    let costoMinimo = req.body.costoMinimo;
    let costoMaximo = req.body.costoMaximo;
    let tipoInmueble = req.body.tipoInmueble;
    let pais = req.body.pais;
    let ciudad = req.body.ciudad;
    let PAX = req.body.PAX;
    let moneda = req.body.moneda

    Inmuebles.hasMany(ImagnenesInmuebles, { foreignKey: 'InmuebleId' });
    Inmuebles.hasMany(Publicaciones, { foreignKey: 'InmuebleId' });

    const page = 1; // Página actual
    const perPage = 12; // Resultados por página
    const offset = (page - 1) * perPage; // Cálculo del desplazamiento
    const where = { status: 1 };
    if (PAX !== null){

        where['$PAX$'] = {
            [Op.gte]: PAX
        }; 
    }
    if (costoMinimo !== null && costoMaximo !== null) {
        where['$costo$'] = {
            [Op.gte]: costoMinimo,
            [Op.lte]: costoMaximo,
        };
    } else if (costoMinimo === null && costoMaximo !== null) {
        where['$costo$'] = {
            [Op.lte]: costoMaximo,
        };
    } else if (costoMinimo !== null && costoMaximo === null) {
        console.log('ter')
        where['$costo$'] = {
            [Op.gte]: costoMinimo
        };
    }

    if (typeof moneda !== 'undefined') {
        moneda = "%" + moneda + "%";
        where['$moneda$'] = sequelize.where(
            sequelize.fn('LOWER', sequelize.col('moneda')),
            {
                [Op.like]: sequelize.fn('LOWER', moneda)
            }
        )
    }

    let whereInmueble = {};
    if (typeof tipoInmueble !== 'undefined' && typeof tipoInmueble !== null) {
        whereInmueble['$TiposInmuebleId$'] = tipoInmueble;
    }

    if (typeof pais !== 'undefined') {
        pais = "%" + pais + "%";
        whereInmueble.Pais = sequelize.where(
            sequelize.fn('LOWER', sequelize.col('Inmueble.Pais')),
            {
                [Op.like]: sequelize.fn('LOWER', pais)
            }
        )
    }

    if (typeof ciudad !== 'undefined') {
        ciudad = "%" + ciudad + "%";
        whereInmueble.Ciudad = sequelize.where(
            sequelize.fn('LOWER', sequelize.col('Inmueble.Ciudad')),
            {
                [Op.like]: sequelize.fn('LOWER', ciudad)
            }
        )
    }

    Publicaciones.findAll({
        include: [
            {
                model: Inmuebles,
                attributes: ['Nombre', 'Pais', 'Ciudad', 'Direccion', 'UserId'],
                where: whereInmueble,
                include: [
                    {
                        model: ImagnenesInmuebles,
                        attributes: ['URL', 'status'],
                        //where: { status: 1 }
                    },
                ],
            },
        ],
        where: where,
        limit: perPage,
        offset: offset,
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