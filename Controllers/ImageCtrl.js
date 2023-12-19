const { ImagnenesInmuebles } = require('../models');

exports.postImage = async (req, res, next) => {
    const { URL, status} = req.body;

    try{
        const image = await DetallesInmuebles.create({
            URL: URL,
            status: status,            
        })

    }catch(err){
        res.status(400).json({
            success: false,
            error: errorModelUser(err)
        });
    }

}

exports.putImage = async (req, res, next) => {

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