
module.exports = (sequelize, DataTypes) => {

    const tiposInmuebles = sequelize.define('TiposInmuebles', {
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "errorTiposInmueblesModel2"
                }
            }
        }

    });

    return tiposInmuebles;
}