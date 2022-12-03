import express from 'express'
import { getNotes, getNote, createNote, deleteNote, updateNoteImportance } from './db/model.js'

// let notes = [ ...notesData ]
const generateId = () => randomBytes(2).toString('hex')
const app = express()

const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next()
}

const RouteNotFound = (req, res) => {
  res.statusCode = 404
  res.statusMessage = 'Route not found'
  res.json({ message: 'Route not found' })
}

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

app.get('/notes/:id', async (req, res) => {
  const { id } = req.params
//  const note = notes.find(n => n.id === id)
  const note = await getNote(id)
  if(note) {
    res.status(200).json(note)
  } else {
    res.statusMessage = "Note can't find" 
    res.status(404).end()
  }
})

app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params
  const response = await deleteNote(id)
  if(response) {
    res.statusCode = 204
    res.end()
  } else {
    res.status(400).json({ message: 'note not found.' })
  }
})

app.post('/notes', async (req, res) => {
  const body = req.body
  if(!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
//  const id = generateId()
  const userData = { 
    content: body.content,
    date: new Date(),
    important: body.important || Math.random() > 0.5 ? true : false
  }
  const note = await createNote(userData) 
  res.status(201).json(note)
})

app.put('/notes/:id', async (req, res) => {
  const body = req.body
  const id = req.params.id
  const response = await updateNoteImportance(id, body.important)
  if(response) {
    return res.status(200).json(response)
  } else {
    res.statusMessage = 'Note can not found.'
    res.status(404).json({ message: 'note can not found.'}) 
  }
})

app.use(RouteNotFound)
export default app
