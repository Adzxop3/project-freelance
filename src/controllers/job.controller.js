const Job = require('../models/job.model')
const Application = require('../models/application.model')

exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== 'employer') {
      return res.status(403).json({ message: 'Forbidden' })
    }
    const { title, description, budget, tags } = req.body
    if (!title || !description || !budget) {
      return res.status(400).json({ message: 'Missing fields' })
    }
    const newJob = await Job.create({
      title,
      description,
      budget,
      tags,
      employerId: req.user.userId
    })
    res.status(201).json({ jobId: newJob._id })
  } catch (err) {
    res.status(500).json({ message: 'Error creating job', error: err.message })
  }
}

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
    res.status(200).json(jobs)
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving jobs', error: err.message })
  }
}

exports.getJobDetails = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    res.status(200).json(job)
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving job details', error: err.message })
  }
}

exports.applyToJob = async (req, res) => {
  try {
    const freelancerId = req.user.userId
    const { coverLetter, price } = req.body
    const jobId = req.params.id
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    const newApplication = await Application.create({
      jobId,
      freelancerId,
      employerId: job.employerId,
      coverLetter,
      price,
      status: 'pending'
    })
    res.status(201).json({ applicationId: newApplication._id })
  } catch (err) {
    res.status(500).json({ message: 'Error applying to job', error: err.message })
  }
}
