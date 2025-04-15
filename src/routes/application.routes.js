const router = require('express').Router()
const { verifyToken, checkRole } = require('../middlewares/auth.middleware')
const { getMyApplications, getMyFreelancerApplications, acceptApplication, rejectApplication } = require('../controllers/application.controller')

router.get('/my', verifyToken, checkRole(['employer']), getMyApplications)
router.get('/my-sent', verifyToken, checkRole(['freelancer']), getMyFreelancerApplications)
router.put('/:id/accept', verifyToken, checkRole(['employer']), acceptApplication)
router.put('/:id/reject', verifyToken, checkRole(['employer']), rejectApplication)

module.exports = router
