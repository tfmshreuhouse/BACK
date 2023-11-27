
module.exports = (sequelize, DataTypes) => {

    const resenas = sequelize.define('Resenas', {
        titulo: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorResenasModel1"
            },
            validate: {
                notEmpty: {
                    msg: "errorResenasModel2"
                }
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorResenasModel3"
            },
            validate: {
                notEmpty: {
                    msg: "errorResenasModel4"
                }
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorResenasModel5"
            },
            validate: {
                notEmpty: {
                    msg: "errorResenasModel6"
                },
                isInt: {
                    msg: "errorResenasModel7"
                },
                min: {
                    args: [0],
                    msg: "errorResenasModel8"
                },
                max: {
                    args: [5],
                    msg: "errorResenasModel9"
                }
            }
        },

    });

    resenas.associate = (models) => {
        resenas.belongsTo(models.Reservas, {
          foreignKey: {
            allowNull: false,
          },
        });
      };

    return resenas;
}