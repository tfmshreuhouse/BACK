const { DireccionesParticulares } = require('../models');
const { errorModelUser } = require('../ErrorHandlers/AuthErrorHandler');
require('dotenv').config();

exports.create = async (req, res, next) => {

    let direcReq = req.body;

    console.log("create " + JSON.stringify(direcReq));

    try {
        const newDirecc = await DireccionesParticulares.create(direcReq);
        res.status(201).json({
            success: true,
            data: newDirecc
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            error: { message: err.message}
        });
    }

};

exports.update = async (req, res, next) => {

    let direccParReq = req.body;

    console.log(JSON.stringify(direccParReq));

    try {

        if(direccParReq.id == null  || direccParReq.id == undefined || direccParReq.id == ""){
            throw Error("debe existir un id a actualizar")
        }

        let direccParDB = await DireccionesParticulares.findOne({
            where: { id: direccParReq.id },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });

        if(direccParDB == null  || direccParDB == undefined){
            throw Error("no existe el registro que quiere actualizar")
        }

        direccParDB.set(direccParReq);

        let direccParUpdate = await direccParDB.save();

        res.status(201).json({
            success: true,
            data: direccParUpdate
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

        let deleteRes = await DireccionesParticulares.destroy({
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