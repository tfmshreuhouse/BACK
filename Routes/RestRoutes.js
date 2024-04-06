const express = require('express');
const router = express.Router();
const tiposInmueblesController = require('../Controllers/TiposInmueblesCtrl');
const reservasCtrl = require('../Controllers/ReservasCtrl');
const direcGeneralCtrl = require('../Controllers/DireccionesGeneralesCtrl');
const direcParticularCtrl = require('../Controllers/DireccionesParticularesCtrl');
const inmueblesCtrl = require('../Controllers/InmueblesCtrl');
const publicacion = require('../Controllers/PublicacionCtrl');
const DetallesInmuebles = require('../Controllers/DetailCtrl');
const ImagnenesInmuebles = require('../Controllers/ImageCtrl');
const { requireAuth } = require('../Middleware/authMiddleware');

const fieldsPutUpdateUser = ['id', 'tipo'];

router.get("/tipos-inmuebles", requireAuth, tiposInmueblesController.getAll)
router.post("/tipos-inmuebles", requireAuth, tiposInmueblesController.create)
router.patch("/tipos-inmuebles", requireAuth, tiposInmueblesController.update)
router.delete("/tipos-inmuebles/:id", requireAuth, tiposInmueblesController.delete)

router.get("/reservas", requireAuth, reservasCtrl.getAll)
router.get("/reservas/filter", requireAuth, reservasCtrl.getFilter)
router.get("/reservas/User/:id", requireAuth, reservasCtrl.getReservaUser)
router.post("/reservas", requireAuth, reservasCtrl.create)
router.patch("/reservas", requireAuth, reservasCtrl.update)
router.delete("/reservas/:id", requireAuth, reservasCtrl.delete)

router.post("/direcGeneral", requireAuth, direcGeneralCtrl.create)
router.patch("/direcGeneral", requireAuth, direcGeneralCtrl.update)
router.delete("/direcGeneral/:id", requireAuth, direcGeneralCtrl.delete)

router.post("/direcParticular", requireAuth, direcParticularCtrl.create)
router.patch("/direcParticular", requireAuth, direcParticularCtrl.update)
router.delete("/direcParticular/:id", requireAuth, direcParticularCtrl.delete)

router.get("/inmuebles", requireAuth, inmueblesCtrl.getAll)
router.post("/inmuebles", requireAuth, inmueblesCtrl.create)
router.patch("/inmuebles", requireAuth, inmueblesCtrl.update)
router.delete("/inmuebles/:id", requireAuth, inmueblesCtrl.delete)
router.get("/inmuebles/:id", requireAuth, inmueblesCtrl.get)

router.get("/publicacion", requireAuth, publicacion.getAll)
router.post("/publicacion", requireAuth, publicacion.create)
router.patch("/publicacion", requireAuth, publicacion.update)

router.post("/DetallesInmuebles", requireAuth, DetallesInmuebles.create)
router.patch("/DetallesInmuebles", requireAuth, DetallesInmuebles.update)
router.delete("/DetallesInmuebles/:id", requireAuth, DetallesInmuebles.delete)

router.post("/ImagnenesInmuebles", requireAuth, ImagnenesInmuebles.create)
router.patch("/Inmueblesmuebles", requireAuth, ImagnenesInmuebles.update)
router.delete("/ImagnenesInmuebles/:id", requireAuth, ImagnenesInmuebles.delete)
router.get("/ImagnenesInmuebles/:id", requireAuth, ImagnenesInmuebles.get)

module.exports = router;
