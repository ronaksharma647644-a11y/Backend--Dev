const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const accountRoutes = require('./routes/accountRoutes')
const limiter = require('./middleware/rateLimiter')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(limiter)

app.use('/api/auth', authRoutes)
app.use('/api/account', accountRoutes)

app.listen(process.env.PORT)
