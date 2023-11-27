
module.exports = (sequelize, DataTypes) => {

    const DetallesInmuebles = sequelize.define('DetallesInmuebles', {
        pisos: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel1"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel2"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel3"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel4"
                },
                max: {
                    args: [5],
                    msg: "errorDetallesInmueblesModel5"
                }
            }
        },
        habitaciones: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel6"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel7"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel8"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel9"
                },
                max: {
                    args: [10],
                    msg: "errorDetallesInmueblesModel10"
                }
            }
        },
        banosCompletos: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel11"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel12"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel13"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel14"
                },
                max: {
                    args: [10],
                    msg: "errorDetallesInmueblesModel15"
                }
            }
        },
        banosMedios: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel16"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel17"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel8"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel9"
                },
                max: {
                    args: [10],
                    msg: "errorDetallesInmueblesModel20"
                }
            }
        },
        cocina: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel21"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel22"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel23"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel24"
                },
                max: {
                    args: [1],
                    msg: "errorDetallesInmueblesModel25"
                }
            }
        },
        lavado: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel26"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel27"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel28"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel29"
                },
                max: {
                    args: [1],
                    msg: "errorDetallesInmueblesModel30"
                }
            }
        },
        patio: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel31"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel32"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel33"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel34"
                },
                max: {
                    args: [1],
                    msg: "errorDetallesInmueblesModel35"
                }
            }
        },
        balcon: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel36"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel37"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel38"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel39"
                },
                max: {
                    args: [1],
                    msg: "errorDetallesInmueblesModel40"
                }
            }
        },
        estacionamiento: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel41"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel42"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel43"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel44"
                },
                max: {
                    args: [1],
                    msg: "errorDetallesInmueblesModel45"
                }
            }
        },
        elevador: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel46"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel47"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel48"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel49"
                },
                max: {
                    args: [1],
                    msg: "errorDetallesInmueblesModel50"
                }
            }
        },
        piscina: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel51"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel52"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel53"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel54"
                },
                max: {
                    args: [1],
                    msg: "errorDetallesInmueblesModel55"
                }
            }
        },
        areasPublicas: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel56"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel57"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel58"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel59"
                },
                max: {
                    args: [1],
                    msg: "errorDetallesInmueblesModel60"
                }
            }
        },
        fumar: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel61"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel62"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel63"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel64"
                },
                max: {
                    args: [1],
                    msg: "errorDetallesInmueblesModel65"
                }
            }
        },
        mascotas: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel66"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel67"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel68"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel69"
                },
                max: {
                    args: [1],
                    msg: "errorDetallesInmueblesModel70"
                }
            }
        },
        reuniones: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel71"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel72"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel73"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel74"
                },
                max: {
                    args: [1],
                    msg: "errorDetallesInmueblesModel75"
                }
            }
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorDetallesInmueblesModel76"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel77"
                }
            }
        },
        indicaciones: {
            type: DataTypes.STRING,
            allowNull: {
                msg: "errorDetallesInmueblesModel78"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel79"
                }
            }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: {
                msg: "errorDetallesInmueblesModel80"
            },
            validate: {
                notEmpty: {
                    msg: "errorDetallesInmueblesModel81"
                },
                isInt: {
                    msg: "errorDetallesInmueblesModel82"
                },
                min: {
                    args: [0],
                    msg: "errorDetallesInmueblesModel83"
                },
                max: {
                    args: [1],
                    msg: "errorDetallesInmueblesModel84"
                }
            }
        }
    });

    return DetallesInmuebles;
}