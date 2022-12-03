import express from 'express'
import('express-async-errors')
import { getNotes, getNote, createNote, deleteNote, updateNoteImportance } from './db/model.js'
import ErrorResponse from './utils/errorResponse.js'
import routeNotFound from './middlewares/routeNotFound.js'
import errorHandler  from './middlewares/errorHandler.js'
import logger  from './middlewares/logger.js'

const app = express()

app.use(logger)
app.use(express.json())
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('it works')
})

app.get('/notes', async (req, res) => {
  const notes = await getNotes()
  res.status(200).json(notes)
})

app.get('/notes/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const note = await getNote(id)
    if(note) {
      res.status(200).json(note)
    } else {
      throw new ErrorResponse(404, "Note can't find")
    }
  } catch (err) {
    const error = new ErrorResponse(err.statusCode, err.message)
    next(error)
  }
})

app.delete('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params
    const response = await deleteNote(id)
    if(response) {
      res.statusCode = 204
      res.end()
    } else {
      res.status(400).json({ message: 'note not found.' })
    }
  } catch (err) {
    const error = new ErrorResponse(400, err.message)
    next(error)
  }
})

app.post('/notes', async (req, res, next) => {
  try {
    const body = req.body
    if(!body.content) {
      throw new ErrorResponse(400, 'content missingg')
    }
    const userData = { 
      content: body.content,
      date: new Date(),
      important: body.important || Math.random() > 0.5 ? true : false
    }
    const note = await createNote(userData) 
    res.status(201).json(note)
  } catch (err) {
    const error = new ErrorResponse(err.statusCode, err.message)
    next(error)
  }
})

app.put('/notes/:id', async (req, res, next) => {
  const body = req.body
  const id = req.params.id
  try {
    const response = await updateNoteImportance(id, body.important)
    if(response) {
      return res.status(200).json(response)
    } else {
      throw new ErrorResponse(404, "Note can't found.")
    }
  } catch (err) {
    const error = new ErrorResponse(err.statusCode, err.message)
    next(error)
  }
})

app.use(routeNotFound)
app.use(errorHandler)
export default app
