
module.exports = (sequelize, DataTypes) => {

    const tiposInmuebles = sequelize.define('TiposInmuebles', {
        tipo: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorTiposInmueblesModel1"
            },
            validate: {
                notEmpty: {
                    msg: "errorTiposInmueblesModel2"
                }
            }
        }

    });

    return tiposInmuebles;
}