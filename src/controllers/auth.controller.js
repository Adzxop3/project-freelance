const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

exports.signup = async (req, res) => {
  try {
    const { email, password, role, name } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)
    const newUser = await User.create({
      email,
      passwordHash,
      role: role.toLowerCase(),
      profileData: { name }
    })
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    res.status(201).json({ token, user: { email: newUser.email, role: newUser.role, name: newUser.profileData.name } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur lors de l'inscription", error: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    res.status(200).json({ token, user: { email: user.email, role: user.role, name: user.profileData.name } })
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: err.message })
  }
}
