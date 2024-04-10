require('dotenv').config();
const jwt = require("jsonwebtoken");

const helperCompararUser = (userReq, userDB) => {
    let userNew = {};

    userNew.id = userReq.id;

    if (userReq.nombres === "") {
        userNew.nombres = userDB.nombres;
    } else {
        userNew.nombres = userReq.nombres;
    }

    if (userReq.apellidos === "") {
        userNew.apellidos = userDB.apellidos;
    } else {
        userNew.apellidos = userReq.apellidos;
    }

    if (userReq.correo === "") {
        userNew.correo = userDB.correo;
    } else {
        userNew.correo = userReq.correo;
    }

    if (userReq.perfil === "") {
        userNew.perfil = userDB.perfil;
    } else {
        userNew.perfil = userReq.perfil;
    }

    if (userReq.status) {
        userNew.status = userReq.status;
    } else {
        userNew.status = userDB.status;
    }

    return userNew;
};

const helperCreateToken = function (userID, perfil) {
    //console.log(perfil);
    let jwtMaxAge = "0m";
    if (perfil === "web") {
        jwtMaxAge = '15m';
    } else {
        jwtMaxAge = '1d';
    }
    return jwt.sign({ userID }, process.env.TOKENSECRET, {
        expiresIn: jwtMaxAge,
    });

};

const helperTokenExpiration = function (expiration) {

    const expirationDateObj = new Date(expiration * 1000);

    const objExpiration = {
        fecha: expirationDateObj.toISOString().split('T')[0],
        hora: expirationDateObj.toISOString().split('T')[1].split('.')[0]
    }

    return objExpiration;
}

const helperValidarAccesos = function (queryAccesoPerfil, queryAccesoOverride, perfil) {

    let accesoPrograma = 2;
    let accesoProgramaOverride = 2;
    let permitido = false;

    if (queryAccesoPerfil === null) {
        console.log("No tienes registrado acceso por perfil");
        accesoPrograma = 2;
    } else if (queryAccesoPerfil.dataValues[perfil] === 0) {
        console.log("No tienes acceso por perfil");
        accesoPrograma = 0;
    } else if (queryAccesoPerfil.dataValues[perfil] === 1) {
        console.log("Si tienes acceso por perfil");
        accesoPrograma = 1;
    }

    if (queryAccesoOverride === null) {
        console.log("No tienes regsitrado acceso por override");
        accesoProgramaOverride = 2;
    } else if (queryAccesoOverride.dataValues.acceso === 0) {
        console.log("No tienes acceso por override");
        accesoProgramaOverride = 0;
    } else if (queryAccesoOverride.dataValues.acceso === 1) {
        console.log("Si tienes acceso por override");
        accesoProgramaOverride = 1;
    }

    if (accesoPrograma === 2 && accesoProgramaOverride === 2) {
        permitido = false;
    } else if (accesoPrograma === 2 && accesoProgramaOverride === 1) {
        permitido = true;
    } else if (accesoPrograma === 2 && accesoProgramaOverride === 0) {
        permitido = false;
    }

    if (accesoPrograma === 1 && accesoProgramaOverride === 2) {
        permitido = true;
    } else if (accesoPrograma === 1 && accesoProgramaOverride === 1) {
        permitido = true;
    } else if (accesoPrograma === 1 && accesoProgramaOverride === 0) {
        permitido = false;
    }

    if (accesoPrograma === 0 && accesoProgramaOverride === 2) {
        permitido = false;
    } else if (accesoPrograma === 0 && accesoProgramaOverride === 1) {
        permitido = true;
    } else if (accesoPrograma === 0 && accesoProgramaOverride === 0) {
        permitido = false;
    }

    return permitido;

}

module.exports = { helperCompararUser, helperCreateToken, helperTokenExpiration, helperValidarAccesos };