import mongoose from 'mongoose'
import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

const app = express()

config()

const { FRONTEND_URL } = process.env

app.use(cors())
app.use(express.json())
app.use(
  fileUpload({
    limits: {
      fileSize: 12000000,
    },
    abortOnLimit: true,
  }),
)

// Import Routes
import authRoute from './routes'

// Route Middlewares
app.use('/api', authRoute)

const port = process.env.PORT || 3000
app.listen(port, function () {
  // Connect to DB
  const db = process.env.DB_HOST

  if (!db) throw Error('Mongodb host is not specified')

  mongoose
    .connect(db)
    .then(() => console.log('Connected to mongodb'))
    .catch(err => console.error('Mongodb connection error', err))

  console.log('Server running on port:' + port)
})
