const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10)
  const user = await User.create({ ...req.body, passwordHash: hash })
  res.json(user)
}

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.sendStatus(404)

  const match = await bcrypt.compare(req.body.password, user.passwordHash)
  if (!match) return res.sendStatus(401)

  const access = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' })
  const refresh = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET)

  res.json({ access, refresh })
}
