const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    var regexStringAlfabetico = /^[a-zA-Z\s]*$/;
    const regexStringCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const User = sequelize.define('User', {
        nombres: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorUserModel1"
            },
            validate: {
                notEmpty: {
                    msg: "errorUserModel2"
                },
                is: {
                    args: regexStringAlfabetico,
                    msg: "errorUserModel3"
                }
            }
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorUserModel4"
            },
            validate: {
                notEmpty: {
                    msg: "errorUserModel5"
                },
                is: {
                    args: regexStringAlfabetico,
                    msg: "errorUserModel6"
                }
            }
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorUserModel7"
            },
            unique: {
                msg: "errorUserModel8"
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: "errorUserModel9"
                },
                is: {
                    args: regexStringCorreo,
                    msg: "errorUserModel10"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorUserModel11"
            },
            validate: {
                notEmpty: {
                    msg: "errorUserModel12"
                },
                len: {
                    args: [8, 15],
                    msg: "errorUserModel13"
                }
            }
        },
        perfil: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorUserModel14"
            },
            validate: {
                notEmpty: {
                    msg: "errorUserModel15"
                },
                is: {
                    args: regexStringAlfabetico,
                    msg: "errorUserModel16"
                }
            }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorUserModel17"
            },
            validate: {
                notEmpty: {
                    msg: "errorUserModel18"
                },
                isInt: {
                    msg: "errorUserModel19"
                },
                min: {
                    args: [0],
                    msg: "errorUserModel20"
                },
                max: {
                    args: [10],
                    msg: "errorUserModel21"
                }
            }
        },

    });

    User.beforeCreate(async (user, options) => {

        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);

    });

    return User;
}