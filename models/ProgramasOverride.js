module.exports = (sequelize, DataTypes) => {

    const ProgramasOverride = sequelize.define('ProgramasOverride', {
        nombrePrograma: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "Nombre de programa no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Nombre de programa no puede ser vacio"
                }
            }
        },
        acceso: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "Acceso web no puede ser nulo"
            },
            validate: {
                notEmpty: {
                    msg: "Acceso web no puede ser vacio"
                },
                isInt: {
                    msg: "Acceso web debe ser INTEGER"
                },
                min: {
                    args: [0],
                    msg: "Acceso web debe ser minimo 0"
                },
                max: {
                    args: [1],
                    msg: "Acceso web debe ser maximo 1"
                }
            }
        }
    });

    ProgramasOverride.associate = (models) => {
        ProgramasOverride.belongsTo(models.User, {
          foreignKey: {
            allowNull: false,
          },
        });
      };

    return ProgramasOverride;
}