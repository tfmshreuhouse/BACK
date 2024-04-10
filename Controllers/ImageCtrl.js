const { ImagnenesInmuebles } = require('../models');

exports.create = async (req, res, next) => {

    const { URL, status, InmuebleId} = req.body;

    console.log(req.body);

    try{
        const image = await ImagnenesInmuebles.create({
            URL: URL,
            status: status,   
            InmuebleId: InmuebleId
        });
        res.status(201).json({
            success: true,
            data: image
        });

    }catch(err){
        res.status(400).json({
            success: false,
            error: err
        });
    }

}

exports.update = async (req, res, next) => {

    const imagereq = {         
        URL: req.body.URL, 
        status: req.body.status,
        InmuebleId: req.body.InmuebleId
    };

    try {
        let imagen = await ImagnenesInmuebles.findOne({
            where: 
            { 
                URL: imagereq.URL, 
                InmuebleId: imagereq.InmuebleId
            }
        });

        imagen.set({
            id: imagen.id,
            URL: imagen.URL,
            status: imagereq.status,
            InmuebleId: imagen.InmuebleId
        });

        let imagenInmueble = await imagen.save();

        res.status(201).json({
            success: true,
            data: imagenInmueble
        });

    }catch(err){
        res.status(400).json({
            success: false,
            error: errorModelUser(err)
        });
    }
}

exports.delete = async (req, res, next) => {

    let id  = req.params.id;

    try {

        await ImagnenesInmuebles.destroy({
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

    try {
        const all = await ImagnenesInmuebles.findAll({
            order: [
                ['updatedAt', 'ASC'],
            ],
            where: {
                InmuebleId: id,
                status: 1
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