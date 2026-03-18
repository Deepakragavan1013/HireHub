const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const {
  applyJob,
  getMyApplications,
  getJobApplications,
  updateStatus
} = require('../controllers/applicationController')
const { protect, employerOnly } = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true)
    } else {
      cb(new Error('Only PDF files allowed'), false)
    }
  }
})

router.post('/:jobId/apply', protect, upload.single('resume'), applyJob)
router.get('/my', protect, getMyApplications)
router.get('/:jobId/applicants', protect, employerOnly, getJobApplications)
router.put('/:id/status', protect, employerOnly, updateStatus)

module.exports = router