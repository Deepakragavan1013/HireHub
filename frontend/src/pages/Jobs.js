
/* eslint-disable */
import { useState, useEffect } from 'react'
import API from '../utils/api'
import JobCard from '../components/jobs/JobCard'

const Jobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('')

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const { data } = await API.get('/jobs', {
        params: { search, location, jobType }
      })
      setJobs(data)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchJobs()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Browse Tech Jobs
      </h1>
      <p className="text-gray-500 mb-8">
        Find your dream job in India
      </p>

      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Search Jobs
          </button>

        </div>
      </form>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No jobs found</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-500 mb-4">
            {jobs.length} jobs found
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Jobs