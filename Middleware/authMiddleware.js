const jwt = require("jsonwebtoken");
require('dotenv').config();
const { TokenControl } = require('../models');
const { helperTokenExpiration } = require('../Helpers/AuthHelper');

const requireAuth = async (req, res, next) => {

    try {
        const authorization = req.headers.authorization
        const token = authorization?.split("Bearer ")[1] // Bearer xxxx

        const tokenInfo = await middlewareValidarToken(token);
        //console.log(tokenInfo);

        if (tokenInfo.success) {
            next();
        } else {
            res.status(400).json(tokenInfo);
        }
    } catch (error) {
        res.status(400).json(tokenInfo);
    }

};

const middlewareValidarToken = async (req, res, next) => {

    let errorToken;
    try {
        const statusToken = await TokenControl.findOne({ where: { token: req } });
        //console.log(statusToken.dataValues.status);
        if (statusToken.dataValues.status === 0) {
            return { success: false, error: "errorAuth4" };
        } else {
            try {
                const tokenInfo = await jwt.verify(req, process.env.TOKENSECRET, function (err, decoded) {
                    if (err) {
                        if (err.name === 'JsonWebTokenError') {
                            errorToken = "ErrorAuth1";
                        }
                        if (err.name === 'TokenExpiredError') {
                            errorToken = "ErrorAuth2";
                        }
                    } else {
                        errorToken = "ErrorAuth0";
                    }
                    if (decoded.exp) {
                        const { fecha, hora } = helperTokenExpiration(decoded.exp);
                        decoded.exp = {
                            fecha: fecha,
                            hora: hora
                        }
                    }
                    if (decoded.iat) {
                        const { fecha, hora } = helperTokenExpiration(decoded.iat);
                        decoded.iat = {
                            fecha: fecha,
                            hora: hora
                        }
                    }
                    return decoded
                });
                return { success: true, data: tokenInfo };
            } catch (error) {
                return { success: false, error: errorToken };
            }
        }
    } catch (error) {
        return { success: false, error: "errorAuth5" };
    }
}

module.exports = { requireAuth, middlewareValidarToken };