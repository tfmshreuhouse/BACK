module.exports = (sequelize, DataTypes) => {

    const Notificaciones = sequelize.define('Notificaciones', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "UserId no puede estar vac�o"
                }
            }
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La fecha no puede estar vac�a"
                }
            }
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El texto de la notificaci�n no puede estar vac�o"
                }
            }
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El texto de la notificaci�n no puede estar vac�o"
                }
            }
        },
        estado: {
            type: DataTypes.INTEGER,
            allowNull: 1,
            defaultValue: 1
        }
    });

    Notificaciones.associate = (models) => {
        Notificaciones.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Notificaciones;
}
