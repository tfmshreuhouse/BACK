const { DetallesInmuebles } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
const { helperCompararDetails } = require('../Helpers/DetailHelper');

exports.create = async (req, res, next) => {

    const { pisos, habitaciones, banosCompletos, banosMedios, cocina, lavado, patio, balcon, 
        estacionamiento, elevador, piscina, areasPublicas, fumar, mascotas, reuniones, descripcion, 
        indicaciones, status } = req.body;

    try {
        const Detail = await DetallesInmuebles.create({
            pisos: pisos,
            habitaciones: habitaciones,
            banosCompletos: banosCompletos,
            banosMedios: banosMedios,
            cocina: cocina,
            patio: patio,
            balcon: balcon,
            estacionamiento: estacionamiento,
            elevador: elevador,
            piscina: piscina,
            areasPublicas: areasPublicas,
            fumar: fumar,
            mascotas: mascotas,
            reuniones: reuniones,
            descripcion: descripcion,
            indicaciones: indicaciones,
            lavado: lavado,
            status: status
        });
        res.status(201).json({
            success: true,
            data: Detail
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: errorModelUser(err)
        });
    }
}

exports.update = async (req, res, next) => {

    const detailreq = { 
        id: req.body.id, 
        pisos: req.body.pisos, 
        habitaciones: req.body.habitaciones, 
        banosCompletos: req.body.banosCompletos, 
        banosMedios: req.body.banosMedios, 
        cocina: req.body.cocina, 
        lavado: req.body.lavado, 
        patio: req.body.patio, 
        balcon: req.body.balcon, 
        estacionamiento: req.body.estacionamiento, 
        elevador: req.body.elevador, 
        piscina: req.body.piscina, 
        areasPublicas: req.body.areasPublicas, 
        fumar: req.body.fumar, 
        mascotas: req.body.mascotas, 
        reuniones: req.body.reuniones, 
        descripcion: req.body.descripcion, 
        indicaciones: req.body.indicaciones, 
        status: req.body.status } = req.body;

    try {
        const detailDb = await DetallesInmuebles.findOne({
            where: { id: detailreq.id }
        });

        const datail = helperCompararDetails(detailreq, detailDb);

        detailDb.set({
            pisos: datail.pisos,
            habitaciones: datail.habitaciones,
            banosCompletos: datail.banosCompletos,
            banosMedios: datail.banosMedios,
            cocina: datail.cocina,
            patio: datail.patio,
            balcon: datail.balcon,
            estacionamiento: datail.estacionamiento,
            elevador: datail.elevador,
            piscina: datail.piscina,
            areasPublicas: datail.areasPublicas,
            fumar: datail.fumar,
            mascotas: datail.mascotas,
            reuniones: datail.reuniones,
            descripcion: datail.descripcion,
            indicaciones: datail.indicaciones,
            lavado: datail.lavado,
            status: datail.status
        });

        const DetailUpdate = await detailDb.save();

        res.status(201).json({
            success: true,
            data: DetailUpdate
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: errorModelUser(err)
        });
    }
}

exports.delete = async (req, res, next) => {

    let id  = req.params.id;

    try {

        await DetallesInmuebles.destroy({
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