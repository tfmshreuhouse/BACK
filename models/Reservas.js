
module.exports = (sequelize, DataTypes) => {

    const reservas = sequelize.define('Reservas', {
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "errorReservasModel2"
                },
                isInt: {
                    msg: "errorReservasModel3"
                },
                min: {
                    args: [1],
                    msg: "errorReservasModel4"
                },
                max: {
                    args: [4],
                    msg: "errorReservasModel5"
                }
            }
        },
        fechaInicio: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
              customValidator(value) {
                if (new Date(value) < new Date()) {
                  throw new Error("la fecha inicio de la reserva debe ser mayor o igual a la de hoy");
                }
              },
            },
        },
        fechaFin: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
              customValidator(value) {
                if (new Date(value) < new Date()) {
                  throw new Error("la fecha inicio de la reserva debe ser mayor o igual a la de hoy");
                }
              },
            },
        },

    });

    reservas.associate = (models) => {
        reservas.belongsTo(models.Publicaciones, {
          foreignKey: {
            allowNull: false,
          },
        });
        reservas.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
      };

    return reservas;
}