const Application = require('../models/application.model')
const Job = require('../models/job.model')
const { generateContract } = require('../controllers/contract.controller')

exports.getMyApplications = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id
    const apps = await Application.find({ employerId: userId })
      .populate('jobId', 'title')
      .populate('freelancerId', 'email')
    res.status(200).json(apps)
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving applications', error: err.message })
  }
}

exports.getMyFreelancerApplications = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id
    const apps = await Application.find({ freelancerId: userId })
      .populate('jobId', 'title employerId')
    res.status(200).json(apps)
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving freelancer applications', error: err.message })
  }
}

exports.acceptApplication = async (req, res) => {
  try {
    const applicationId = req.params.id
    const application = await Application.findById(applicationId)
    if (!application) return res.status(404).json({ message: 'Application not found' })
    application.status = 'accepted'
    await application.save()
    await application.populate('jobId freelancerId')
    generateContract(application, (err, contractUrl) => {
      if (err) return res.status(500).json({ message: 'Error generating contract', error: err.message })
      res.status(200).json({ message: 'Application accepted', contractUrl })
    })
  } catch (err) {
    res.status(500).json({ message: 'Error accepting application', error: err.message })
  }
}

exports.rejectApplication = async (req, res) => {
  try {
    const applicationId = req.params.id
    const application = await Application.findById(applicationId)
    if (!application) return res.status(404).json({ message: 'Application not found' })
    application.status = 'rejected'
    await application.save()
    res.status(200).json({ message: 'Application rejected' })
  } catch (err) {
    res.status(500).json({ message: 'Error rejecting application', error: err.message })
  }
}
