import { useState, useEffect } from 'react'
import API from '../utils/api'

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Viewed: 'bg-blue-100 text-blue-700',
  Shortlisted: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700'
}

const MyApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await API.get('/applications/my')
        setApplications(data)
      } catch (error) {
        console.error(error)
      }
      setLoading(false)
    }
    fetchApplications()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Loading applications...</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        My Applications
      </h1>
      <p className="text-gray-500 mb-8">
        Track all your job applications
      </p>

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <p className="text-gray-500 text-lg mb-4">
            You have not applied to any jobs yet
          </p>
          
           <a href="/jobs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
          >
            Browse Jobs
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {app.job?.title}
                  </h2>
                  <p className="text-blue-600 font-semibold">
                    {app.job?.company}
                  </p>
                  <div className="flex gap-4 text-gray-500 text-sm mt-2">
                    <span>📍 {app.job?.location}</span>
                    <span>💰 {app.job?.salary}</span>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full font-semibold text-sm ${statusColors[app.status]}`}>
                  {app.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-4">
                Applied on {new Date(app.createdAt).toLocaleDateString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default MyApplications