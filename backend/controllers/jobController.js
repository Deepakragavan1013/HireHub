const Job = require('../models/Job')

const createJob = async (req, res) => {
  try {
    const { title, company, location, jobType, salary, description, skills } = req.body

    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      salary,
      description,
      skills,
      employer: req.user._id
    })

    res.status(201).json(job)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllJobs = async (req, res) => {
  try {
    const { search, location, jobType } = req.query

    let filter = {}

    if (search) {
      filter.title = { $regex: search, $options: 'i' }
    }
    if (location) {
      filter.location = { $regex: location, $options: 'i' }
    }
    if (jobType) {
      filter.jobType = jobType
    }

    const jobs = await Job.find(filter)
      .populate('employer', 'name email')
      .sort({ createdAt: -1 })

    res.json(jobs)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('employer', 'name email')

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    res.json(job)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' })
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updatedJob)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this job' })
    }

    await Job.findByIdAndDelete(req.params.id)
    res.json({ message: 'Job deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob }