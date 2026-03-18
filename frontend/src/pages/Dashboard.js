import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-blue-100">
          {user?.role === 'employer' 
            ? 'Manage your job listings and applicants' 
            : 'Track your job applications'}
        </p>
      </div>

      {user?.role === 'employer' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Post a New Job
            </h2>
            <p className="text-gray-500 mb-4">
              Create a new job listing to find the best candidates
            </p>
            <Link
              to="/post-job"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
            >
              Post a Job
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              My Job Listings
            </h2>
            <p className="text-gray-500 mb-4">
              View and manage all your posted jobs
            </p>
            <Link
              to="/my-jobs"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition inline-block"
            >
              View My Jobs
            </Link>
          </div>

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Browse Jobs
            </h2>
            <p className="text-gray-500 mb-4">
              Find your dream tech job in India
            </p>
            <Link
              to="/jobs"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
            >
              Browse Jobs
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              My Applications
            </h2>
            <p className="text-gray-500 mb-4">
              Track all your job applications and their status
            </p>
            <Link
              to="/my-applications"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition inline-block"
            >
              View Applications
            </Link>
          </div>

        </div>
      )}

    </div>
  )
}

export default Dashboard