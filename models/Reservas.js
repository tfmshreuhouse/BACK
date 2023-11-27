
module.exports = (sequelize, DataTypes) => {

    const reservas = sequelize.define('Reservas', {
        status: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorReservasModel1"
            },
            validate: {
                notEmpty: {
                    msg: "errorReservasModel2"
                },
                isInt: {
                    msg: "errorReservasModel3"
                },
                min: {
                    args: [0],
                    msg: "errorReservasModel4"
                },
                max: {
                    args: [4],
                    msg: "errorReservasModel5"
                }
            }
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