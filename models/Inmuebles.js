
module.exports = (sequelize, DataTypes) => {

    const Inmuebles = sequelize.define('Inmuebles', {
        Pais: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorInmueblesModel1"
            },
            validate: {
                notEmpty: {
                    msg: "errorInmueblesModel2"
                },
            }
        },
        Ciudad: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorInmueblesModel3"
            },
            validate: {
                notEmpty: {
                    msg: "errorInmueblesModel4"
                },
            }
        },
        Direccion: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorInmueblesModel5"
            },
            validate: {
                notEmpty: {
                    msg: "errorInmueblesModel6"
                },
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