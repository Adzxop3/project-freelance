const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coverLetter: { type: String },
  price: { type: Number },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
}, { timestamps: true })

module.exports = mongoose.model('Application', applicationSchema)