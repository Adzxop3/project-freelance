const router = require('express').Router()
const { createJob, getJobs, getJobDetails, applyToJob } = require('../controllers/job.controller')
const { verifyToken, checkRole } = require('../middlewares/auth.middleware')

router.post('/', verifyToken, checkRole(['employer']), createJob)
router.get('/', getJobs)
router.get('/:id', getJobDetails)
router.post('/:id/apply', verifyToken, checkRole(['freelancer']), applyToJob)

module.exports = router