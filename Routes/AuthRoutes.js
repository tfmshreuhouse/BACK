const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthCtrl')
const { middlewareValidateRequestFields, middlewareValidateRequestValues } = require('../Middleware/globalMiddleware');

const fieldsPostCreateUser = ['nombres', 'apellidos', 'correo', 'telefono', 'password', 'perfil', 'status'];
const fieldsPutUpdateUser = ['id', 'nombres', 'apellidos', 'correo', 'telefono', 'perfil', 'status'];
const fieldsPutUpdatePass = ['id', 'newPassword', 'oldPassword'];
const fieldsGetTokenInfo = ['token'];
const fieldsGetUserInfo = ['token'];
const fieldsGetLoginUser = ['correo', 'password'];
const fieldsGetLogoutUser = ['token'];
const fieldsGetAccesoPrograma = ['token', 'programa'];

//GET Todos los Users
router.get("", authController.getALLUsers);

//GET Token info
router.get("/token/info", middlewareValidateRequestFields("query", fieldsGetTokenInfo, "errorAuthReqBody2"), authController.getTokenInfo);

//GET user info
router.get("/user/info/:id", authController.getUserById);


//GET Logout
router.get("/logout", middlewareValidateRequestFields("query", fieldsGetLogoutUser, "errorAuthReqBody5"), middlewareValidateRequestValues("query", fieldsGetLogoutUser, "errorAuthReqBody6"), authController.getLogoutUser);

//GET Acceso a Programa
router.get("/programa", middlewareValidateRequestFields("query", fieldsGetAccesoPrograma, "errorAuthReqBody7"), middlewareValidateRequestValues("query", fieldsGetAccesoPrograma, "errorAuthReqBody8"), authController.getAccesoPrograma);

//POST Create Users
router.post("", middlewareValidateRequestFields("body", fieldsPostCreateUser, "errorAuthReqBody0"), authController.postCreateUser);

//POST Login User
//router.post("/login", validateRequestFields("body", fieldsLogin, "errorAuthReqBody3"), authController.postLoginUser);
router.post("/login", middlewareValidateRequestFields("body", fieldsGetLoginUser, "errorAuthReqBody3"), middlewareValidateRequestValues("body", fieldsGetLoginUser, "errorAuthReqBody4"), authController.postLoginUser);

//PUT Update Users
router.put("/UpdateUser", middlewareValidateRequestFields("body", fieldsPutUpdateUser, "errorAuthReqBody1"), authController.putUpdateUserInfo);
router.put("/UpdatePass", middlewareValidateRequestFields("body", fieldsPutUpdatePass, "errorAuthReqBody1"), authController.putUpdateUserPass);

module.exports = router;