import { Link } from 'react-router-dom'

const JobCard = ({ job }) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-md transition p-6">
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {job.title}
          </h2>
          <p className="text-blue-600 font-semibold">
            {job.company}
          </p>
        </div>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          {job.jobType}
        </span>
      </div>

      <div className="flex gap-4 text-gray-500 text-sm mb-4">
        <span>📍 {job.location}</span>
        <span>💰 {job.salary}</span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-gray-400 text-sm">
          {new Date(job.createdAt).toLocaleDateString('en-IN')}
        </span>
        <Link
          to={`/jobs/${job._id}`}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View Job
        </Link>
      </div>

    </div>
  )
}

export default JobCard