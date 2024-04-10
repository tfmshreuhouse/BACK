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
        master: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "Perfil master no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Perfil master no puede ser vacio"
                },
                isInt: {
                    msg: "Perfil master debe ser INTEGER"
                },
                min: {
                    args: [0],
                    msg: "Perfil master debe ser minimo 0"
                },
                max: {
                    args: [1],
                    msg: "Perfil master debe ser maximo 1"
                }
            }
        },
        cliente: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "Perfil cliente no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Perfil cliente no puede ser vacio"
                },
                isInt: {
                    msg: "Perfil cliente debe ser INTEGER"
                },
                min: {
                    args: [0],
                    msg: "Perfil cliente debe ser minimo 0"
                },
                max: {
                    args: [1],
                    msg: "Perfil cliente debe ser maximo 1"
                }
            }
        },
        arrendador: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "Perfil arrendador no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Perfil arrendador no puede ser vacio"
                },
                isInt: {
                    msg: "Perfil arrendador debe ser INTEGER"
                },
                min: {
                    args: [0],
                    msg: "Perfil arrendador debe ser minimo 0"
                },
                max: {
                    args: [1],
                    msg: "Perfil arrendador debe ser maximo 1"
                }
            }
        }
    });

    return Permisos;
}