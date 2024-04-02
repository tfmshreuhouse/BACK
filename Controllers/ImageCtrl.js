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
        id: req.body.id,
        URL: req.body.URL, 
        status: req.body.status
    };

    try {
        const updatedImage = await ImagnenesInmuebles.findOneAndUpdate(
            { id: imagereq.id },
            { $set: { status: imagereq.status } },
            { new: true }
        );

        if (!updatedImage) {
            return res.status(404).json({
                success: false,
                error: 'Image not found'
            });
        }

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