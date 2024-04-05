
module.exports = (sequelize, DataTypes) => {

    const Inmuebles = sequelize.define('Inmuebles', {
        Nombre: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "Nombre del inmueble no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Nombre del inmueble no puede ser vacio"
                }
            }
        },
        Pais: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "Nombre del pais no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Nombre del pais no puede ser vacio"
                }
            }
        },
        Ciudad: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "Nombre de la ciudad no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Nombre de la ciudad no puede ser vacio"
                }
            }
        },
        Direccion: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "Nombre de la direccion no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Nombre de la direccion no puede ser vacio"
                }
            }
        }
    });

    Inmuebles.associate = (models) => {
        Inmuebles.belongsTo(models.TiposInmuebles, {
            foreignKey: {
                allowNull: false,
            },
        });
        Inmuebles.belongsTo(models.DetallesInmuebles, {
            foreignKey: {
                allowNull: false,
            },
        });
        Inmuebles.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Inmuebles;
}