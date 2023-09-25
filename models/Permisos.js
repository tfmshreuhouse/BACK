module.exports = (sequelize, DataTypes) => {

    const Permisos = sequelize.define('Permisos', {
        nombrePermiso: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "Nombre de permiso no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Nombre de permiso no puede ser vacio"
                }
            }
        },
        web: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "Perfil web no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Perfil web no puede ser vacio"
                },
                isInt: {
                    msg: "Perfil web debe ser INTEGER"
                },
                min: {
                    args: [0],
                    msg: "Perfil web debe ser minimo 0"
                },
                max: {
                    args: [1],
                    msg: "Perfil web debe ser maximo 1"
                }
            }
        },
        web: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "Perfil web no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Perfil web no puede ser vacio"
                },
                isInt: {
                    msg: "Perfil web debe ser INTEGER"
                },
                min: {
                    args: [0],
                    msg: "Perfil web debe ser minimo 0"
                },
                max: {
                    args: [1],
                    msg: "Perfil web debe ser maximo 1"
                }
            }
        },
        hostess: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "Perfil hostess no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Perfil hostess no puede ser vacio"
                },
                isInt: {
                    msg: "Perfil hostess debe ser INTEGER"
                },
                min: {
                    args: [0],
                    msg: "Perfil hostess debe ser minimo 0"
                },
                max: {
                    args: [1],
                    msg: "Perfil hostess debe ser maximo 1"
                }
            }
        },
        capitan: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "Perfil capitan no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Perfil capitan no puede ser vacio"
                },
                isInt: {
                    msg: "Perfil capitan debe ser INTEGER"
                },
                min: {
                    args: [0],
                    msg: "Perfil capitan debe ser minimo 0"
                },
                max: {
                    args: [1],
                    msg: "Perfil capitan debe ser maximo 1"
                }
            }
        },
        champion: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "Perfil champion no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Perfil champion no puede ser vacio"
                },
                isInt: {
                    msg: "Perfil champion debe ser INTEGER"
                },
                min: {
                    args: [0],
                    msg: "Perfil champion debe ser minimo 0"
                },
                max: {
                    args: [1],
                    msg: "Perfil champion debe ser maximo 1"
                }
            }
        }
    });

    return Permisos;
}