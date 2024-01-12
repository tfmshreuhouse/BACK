const { DireccionesGenerales } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
require('dotenv').config();

exports.create = async (req, res, next) => {

    let direcReq = req.body;

    console.log("tipo " + JSON.stringify(direcReq));

    try {
        const newInmueble = await DireccionesGenerales.create(direcReq);
        res.status(201).json({
            success: true,
            data: newInmueble
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: { message: err.message}
        });
    }

};

exports.update = async (req, res, next) => {

    let direcGenReq = req.body;

    console.log(JSON.stringify(direcGenReq));

    try {

        if(direcGenReq.id == null  || direcGenReq.id == undefined || direcGenReq.id == ""){
            throw Error("debe existir un id a actualizar")
        }

        let direcGenDB = await DireccionesGenerales.findOne({
            where: { id: direcGenReq.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        if(direcGenDB == null  || direcGenDB == undefined){
            throw Error("no existe el registro que quiere actualizar")
        }

        direcGenDB.set(direcGenReq);

        let direcGenUpdate = await direcGenDB.save();

        res.status(201).json({
            success: true,
            data: direcGenUpdate
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

        let deleteRes = await DireccionesGenerales.destroy({
            where: {
              id: id
            }
          });

        console.log(deleteRes);

        if(deleteRes > 0) {
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
            error: errorModelUser(err)
        });
    }

};