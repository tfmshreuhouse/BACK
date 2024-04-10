const { Inmuebles, TiposInmuebles, DetallesInmuebles, User, ImagnenesInmuebles, Publicaciones } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
require('dotenv').config();

exports.getAll = async (req, res, next) => {

    Inmuebles.hasMany(ImagnenesInmuebles, { foreignKey: 'InmuebleId' });

    try {
        const all = await Inmuebles.findAll({ 
            order: [
                ['updatedAt', 'ASC'],
            ],
            include: [{ model: TiposInmuebles },
                      { model: DetallesInmuebles },
                      { model: User},
                      { model: ImagnenesInmuebles}]
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

    let Inmueble = req.body

    try {
        const newInmueble = await Inmuebles.create({
            Nombre: Inmueble.Nombre,
            Pais: Inmueble.Pais,
            Ciudad: Inmueble.Ciudad,
            Direccion: Inmueble.Direccion,
            TiposInmuebleId : Inmueble.TiposInmuebleId,
            DetallesInmuebleId : Inmueble.DetallesInmuebles,
            UserId: Inmueble.UserId
        });
        res.status(201).json({
            success: true,
            data: newInmueble
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: errorModelUser(err)
        });
    }

};

exports.update = async (req, res, next) => {

    let Inmueble = req.body;

    try {
        let InmuebleDB = await Inmuebles.findOne({
            where: { id: Inmueble.id }
        });

        InmuebleDB.set({
            Nombre: Inmueble.Nombre,
            Pais: Inmueble.Pais,
            Ciudad: Inmueble.Ciudad,
            Direccion: Inmueble.Direccion,
            TiposInmuebleId : Inmueble.TiposInmuebleId,
            DetallesInmuebleId : Inmueble.DetallesInmuebles,
            UserId: Inmueble.UserId
        });

        let InmuebleUpdate = await InmuebleDB.save();

        res.status(201).json({
            success: true,
            data: InmuebleUpdate
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


    try {

        await Inmuebles.destroy({
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

exports.get = async (req, res, next) => {

    let id  = req.params.id;
    Inmuebles.hasMany(ImagnenesInmuebles, { foreignKey: 'InmuebleId' });
    Inmuebles.hasMany(Publicaciones, { foreignKey: 'InmuebleId' });

    try {
        const all = await Inmuebles.findOne({
            where: {
                id: id
              },
            include: [{ model: TiposInmuebles },
                      { model: DetallesInmuebles },
                      { model: User},
                      { model: ImagnenesInmuebles,
                        where: { status: 1 }},
                      { model: Publicaciones}]
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

exports.getforUser = async (req, res, next) => {
    let userId = req.params.userId;

    Inmuebles.hasMany(ImagnenesInmuebles, { foreignKey: 'InmuebleId' });

    try {
        const userInmuebles = await Inmuebles.findAll({
            where: {
                UserId: userId
            },
            include: [{ model: TiposInmuebles },
                      { model: ImagnenesInmuebles}]
        });
        res.status(200).json({
            success: true,
            data: userInmuebles
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "errorServer1 " + err
        });
    }
};