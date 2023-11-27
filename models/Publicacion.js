
module.exports = (sequelize, DataTypes) => {

    const publicaciones = sequelize.define('Publicaciones', {
        fechaActiva: {
            type: DataTypes.DATE,
            allowNull: {
                msg: "errorPublicacionesModel1"
            },
            validate: {
                notEmpty: {
                    msg: "errorPublicacionesModel2"
                }
            }
        },
        fechaInActiva: {
            type: DataTypes.DATE,
            allowNull: {
                msg: "errorPublicacionesModel3"
            },
            validate: {
                notEmpty: {
                    msg: "errorPublicacionesModel4"
                }
            }
        },
        PAX: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorPublicacionesModel5"
            },
            validate: {
                notEmpty: {
                    msg: "errorPublicacionesModel6"
                },
                isInt: {
                    msg: "errorPublicacionesModel7"
                },
                min: {
                    args: [1],
                    msg: "errorPublicacionesModel8"
                }
            }
        },
        costo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: {
                msg: "errorPublicacionesModel9"
            },
            validate: {
                notEmpty: {
                    msg: "errorPublicacionesModel10"
                }
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorPublicacionesModel11"
            },
            validate: {
                notEmpty: {
                    msg: "errorPublicacionesModel12"
                }
            }
        },
        indicaciones: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorPublicacionesModel13"
            },
            validate: {
                notEmpty: {
                    msg: "errorPublicacionesModel14"
                }
            }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorPublicacionesModel15"
            },
            validate: {
                notEmpty: {
                    msg: "errorPublicacionesModel16"
                },
                isInt: {
                    msg: "errorPublicacionesModel17"
                },
                min: {
                    args: [0],
                    msg: "errorPublicacionesModel18"
                },
                max: {
                    args: [2],
                    msg: "errorPublicacionesModel19"
                }
            }
        }
    });

    publicaciones.associate = (models) => {
        publicaciones.belongsTo(models.Inmuebles, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return publicaciones;
}