const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const role = require('../middleware/roleMiddleware')
const ctrl = require('../controllers/accountController')

router.post('/create', auth, ctrl.createAccount)
router.post('/deposit', auth, ctrl.deposit)
router.post('/withdraw', auth, ctrl.withdraw)
router.post('/transfer', auth, ctrl.transfer)
router.get('/history', auth, ctrl.history)
router.get('/all', auth, role('admin'), ctrl.history)

module.exports = router
