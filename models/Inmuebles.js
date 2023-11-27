
module.exports = (sequelize, DataTypes) => {

    const Inmuebles = sequelize.define('Inmuebles', {

    });

    Inmuebles.associate = (models) => {
        Inmuebles.belongsTo(models.DireccionesGenerales, {
            foreignKey: {
                allowNull: false,
            },
        });
        Inmuebles.belongsTo(models.DireccionesParticulares, {
            foreignKey: {
                allowNull: false,
            },
        });
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