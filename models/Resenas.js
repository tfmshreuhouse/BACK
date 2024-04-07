module.exports = (sequelize, DataTypes) => {
    const Resenas = sequelize.define('Resenas', {
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true, // Permitir valores nulos según la definición de la tabla
            defaultValue: null,
            validate: {
                notEmpty: {
                    msg: "La descripción es requerida"
                }
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true, // Permitir valores nulos según la definición de la tabla
            defaultValue: null,
            validate: {
                isInt: {
                    msg: "El rating debe ser un número entero"
                },
                min: {
                    args: [0],
                    msg: "El rating mínimo permitido es 0"
                },
                max: {
                    args: [5],
                    msg: "El rating máximo permitido es 5"
                }
            }
        }
    }, {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        tableName: 'Resenas',
        charset: 'latin1',
        collate: 'latin1_swedish_ci',
    });

    Resenas.associate = (models) => {
        Resenas.belongsTo(models.Reservas, {
            foreignKey: {
                allowNull: false,
            },
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE' 
        });
        Resenas.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Resenas;
};
