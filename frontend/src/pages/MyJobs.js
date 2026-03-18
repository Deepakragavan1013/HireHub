import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import API from '../utils/api'

const MyJobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMyJobs = async () => {
    try {
      const { data } = await API.get('/jobs')
      setJobs(data)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchMyJobs()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return
    try {
      await API.delete(`/jobs/${id}`)
      toast.success('Job deleted successfully!')
      fetchMyJobs()
    } catch (error) {
      toast.error('Failed to delete job')
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Loading jobs...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            My Job Listings
          </h1>
          <p className="text-gray-500">
            Manage all your posted jobs
          </p>
        </div>
        <Link
          to="/post-job"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <p className="text-gray-500 text-lg mb-4">
            You have not posted any jobs yet
          </p>
          <Link
            to="/post-job"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
          >
            Post Your First Job
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-blue-600 font-semibold">
                    {job.company}
                  </p>
                  <div className="flex gap-4 text-gray-500 text-sm mt-2">
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary}</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {job.jobType}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    to={`/jobs/${job._id}`}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Posted on {new Date(job.createdAt).toLocaleDateString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default MyJobs