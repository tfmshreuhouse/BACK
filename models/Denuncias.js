
module.exports = (sequelize, DataTypes) => {

    const denuncias = sequelize.define('Denuncias', {
        motivo: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorDenunciasModel1"
            },
            validate: {
                notEmpty: {
                    msg: "errorDenunciasModel2"
                }
            }
        },
        justificacion: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorDenunciasModel3"
            },
            validate: {
                notEmpty: {
                    msg: "errorDenunciasModel4"
                }
            }
        },

    });

    denuncias.associate = (models) => {
        denuncias.belongsTo(models.Publicaciones, {
            foreignKey: {
              allowNull: false,
            },
          });
          denuncias.belongsTo(models.User, {
              foreignKey: {
                  allowNull: false,
              },
          });
      };

    return denuncias;
}