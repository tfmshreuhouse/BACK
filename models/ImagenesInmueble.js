
module.exports = (sequelize, DataTypes) => {

    const ImagnenesInmuebles = sequelize.define('ImagnenesInmuebles', {
        URL: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorImagnenesInmueblesModel1"
            },
            validate: {
                notEmpty: {
                    msg: "errorImagnenesInmueblesModel2"
                }
            }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorImagnenesInmueblesModel3"
            },
            validate: {
                notEmpty: {
                    msg: "errorImagnenesInmueblesModel4"
                },
                isInt: {
                    msg: "errorImagnenesInmueblesModel5"
                },
                min: {
                    args: [0],
                    msg: "errorImagnenesInmueblesModel6"
                },
                max: {
                    args: [10],
                    msg: "errorImagnenesInmueblesModel7"
                }
            }
        },

    });

    ImagnenesInmuebles.associate = (models) => {
        ImagnenesInmuebles.belongsTo(models.Inmuebles, {
          foreignKey: {
            allowNull: false,
          },
        });
      };

    return ImagnenesInmuebles;
}