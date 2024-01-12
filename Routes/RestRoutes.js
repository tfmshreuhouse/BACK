const express = require('express');
const router = express.Router();
const tiposInmueblesController = require('../Controllers/TiposInmueblesCtrl')
const reservasCtrl = require('../Controllers/ReservasCtrl')
const { requireAuth } = require('../Middleware/authMiddleware');

const fieldsPutUpdateUser = ['id', 'tipo'];

router.get("/tipos-inmuebles", requireAuth, tiposInmueblesController.getAll)
router.post("/tipos-inmuebles", requireAuth, tiposInmueblesController.create)
router.patch("/tipos-inmuebles", requireAuth, tiposInmueblesController.update)
router.delete("/tipos-inmuebles/:id", requireAuth, tiposInmueblesController.delete)

router.get("/reservas", requireAuth, reservasCtrl.getAll)
router.get("/reservas/filter", requireAuth, reservasCtrl.getFilter)
router.post("/reservas", requireAuth, reservasCtrl.create)
router.patch("/reservas", requireAuth, reservasCtrl.update)
router.delete("/reservas/:id", requireAuth, reservasCtrl.delete)

module.exports = router;