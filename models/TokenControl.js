module.exports = (sequelize, DataTypes) => {

    const TokenControl = sequelize.define('TokenControl', {
        token: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorTokenControlModel1"
            },
            validate: {
                notEmpty: {
                    msg: "errorTokenControlModel2"
                }
            }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorTokenControlModel4"
            },
            validate: {
                notEmpty: {
                    msg: "errorTokenControlModel5"
                },
                isInt: {
                    msg: "errorTokenControlModel6"
                },
                min: {
                    args: [0],
                    msg: "errorTokenControlModel7"
                },
                max: {
                    args: [1],
                    msg: "errorTokenControlModel8"
                }
            }
        }
    });

    return TokenControl;
}