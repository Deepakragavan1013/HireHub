/* eslint-disable */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/layout/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import MyApplications from './pages/MyApplications'
import PostJob from './pages/PostJob'
import MyJobs from './pages/MyJobs'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={
            <div className="text-center mt-20">
              <h1 className="text-5xl font-bold text-blue-600">
                Welcome to Hire<span className="text-yellow-400">Hub</span>
              </h1>
              <p className="text-gray-500 mt-4 text-lg">
                Find your dream tech job in India
              </p>
              <a href="/jobs" className="mt-8 inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition text-lg">
                Browse Jobs
              </a>
            </div>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/my-jobs" element={<MyJobs />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App