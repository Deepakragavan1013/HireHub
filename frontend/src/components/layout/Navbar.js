import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Hire<span className="text-yellow-300">Hub</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/jobs" className="hover:text-yellow-300 transition">
            Browse Jobs
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-300 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-300 text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="hover:text-yellow-300 transition"
              >
                Dashboard
              </Link>
              <span className="text-yellow-300 font-semibold">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar