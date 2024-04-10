
module.exports = (sequelize, DataTypes) => {

    const direccionesGenerales = sequelize.define('DireccionesGenerales', {
        comunidad: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "errorDireccionesGeneralesModel2"
                }
            }
        },
        provincia: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "errorDireccionesGeneralesModel4"
                }
            }
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "errorDireccionesGeneralesModel6"
                }
            }
        }
    });

    return direccionesGenerales;
}