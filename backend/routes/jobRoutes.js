const express = require('express')
const router = express.Router()
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/jobController')
const { protect, employerOnly } = require('../middleware/authMiddleware')

router.get('/', getAllJobs)
router.get('/:id', getJobById)
router.post('/', protect, employerOnly, createJob)
router.put('/:id', protect, employerOnly, updateJob)
router.delete('/:id', protect, employerOnly, deleteJob)

module.exports = router