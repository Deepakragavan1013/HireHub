const Application = require('../models/Application')
const Job = require('../models/Job')

const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    const alreadyApplied = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user._id
    })

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You already applied to this job' })
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload your resume' })
    }

    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user._id,
      resume: req.file.filename,
      coverLetter: req.body.coverLetter
    })

    res.status(201).json(application)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company location salary')
      .sort({ createdAt: -1 })

    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId)
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' })
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email')
      .sort({ createdAt: -1 })

    res.json(applications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
    if (!application) {
      return res.status(404).json({ message: 'Application not found' })
    }

    application.status = req.body.status
    await application.save()

    res.json(application)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { applyJob, getMyApplications, getJobApplications, updateStatus }