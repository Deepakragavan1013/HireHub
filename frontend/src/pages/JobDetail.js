
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../utils/api'
import { useAuth } from '../context/AuthContext'

const JobDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [resume, setResume] = useState(null)

useEffect(() => {
  const fetchJob = async () => {
    try {
      const { data } = await API.get(`/jobs/${id}`)
      setJob(data)
    } catch (error) {
      toast.error('Job not found')
      navigate('/jobs')
    }
    setLoading(false)
  }
  fetchJob()
}, [id, navigate])

  const handleApply = async (e) => {
    e.preventDefault()
    if (!user) {
      toast.error('Please login to apply')
      navigate('/login')
      return
    }
    if (!resume) {
      toast.error('Please upload your resume')
      return
    }
    setApplying(true)
    try {
      const formData = new FormData()
      formData.append('resume', resume)
      formData.append('coverLetter', coverLetter)
      await API.post(`/applications/${id}/apply`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      toast.success('Application submitted successfully!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
    setApplying(false)
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Loading job...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <div className="bg-white rounded-2xl shadow p-8 mb-6">

        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {job.title}
            </h1>
            <p className="text-blue-600 text-xl font-semibold">
              {job.company}
            </p>
          </div>
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            {job.jobType}
          </span>
        </div>

        <div className="flex gap-6 text-gray-500 mb-6">
          <span>📍 {job.location}</span>
          <span>💰 {job.salary}</span>
          <span>📅 {new Date(job.createdAt).toLocaleDateString('en-IN')}</span>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Job Description
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {job.description}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Required Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-gray-500">
            Posted by: <span className="font-semibold text-gray-700">
              {job.employer?.name}
            </span>
          </p>
        </div>

      </div>

      {user?.role === 'jobseeker' && (
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Apply for this Job
          </h2>
          <form onSubmit={handleApply} className="space-y-5">

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Upload Resume (PDF only)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Cover Letter (Optional)
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell the employer why you are the best candidate..."
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={applying}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {applying ? 'Submitting...' : 'Submit Application'}
            </button>

          </form>
        </div>
      )}

      {!user && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
          <p className="text-yellow-800 font-semibold text-lg mb-4">
            Please login to apply for this job
          </p>
          <a href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block">
            Login to Apply
          </a>
        </div>
      )}

    </div>
  )
}

export default JobDetail