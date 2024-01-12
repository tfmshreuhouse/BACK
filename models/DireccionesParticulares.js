
module.exports = (sequelize, DataTypes) => {

    const direccionesParticulares = sequelize.define('DireccionesParticulares', {
        avenida: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "errorDireccionesParticularesModel2"
                }
            }
        },
        calle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "errorDireccionesParticularesModel4"
                }
            }
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "errorDireccionesParticularesModel6"
                }
            }
        },
        planta: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorDireccionesParticularesModel7"
            },
            validate: {
                notEmpty: {
                    msg: "errorDireccionesParticularesModel8"
                }
            }
        },
        piso: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorDireccionesParticularesModel9"
            },
            validate: {
                notEmpty: {
                    msg: "errorDireccionesParticularesModel10"
                }
            }
        },
        CP: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorDireccionesParticularesModel11"
            },
            validate: {
                notEmpty: {
                    msg: "errorDireccionesParticularesModel12"
                }
            }
        }
    });

    return direccionesParticulares;
}