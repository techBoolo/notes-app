import express from 'express'
import ErrorResponse from './utils/errorResponse.js'
import routeNotFound from './middlewares/routeNotFound.js'
import errorHandler  from './middlewares/errorHandler.js'
import logger  from './middlewares/logger.js'
import notesRoute from './routes/notes.js'
import usersRoute from './routes/users.js'

const app = express()

app.use(logger)
app.use(express.json())
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('it works')
})

app.use('/notes', notesRoute)
app.use('/users', usersRoute)

app.use(routeNotFound)
app.use(errorHandler)
export default app
