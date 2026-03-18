const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  try {
    let token

    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } else {
      res.status(401).json({ message: 'Not authorized, no token' })
    }
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' })
  }
}

const employerOnly = (req, res, next) => {
  if (req.user && req.user.role === 'employer') {
    next()
  } else {
    res.status(403).json({ message: 'Only employers can do this' })
  }
}

module.exports = { protect, employerOnly }