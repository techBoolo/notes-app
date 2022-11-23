import express from 'express'
import { randomBytes } from 'crypto'
import { notesData } from './data/notes.js'

const generateId = () => randomBytes(2).toString('hex')
const app = express()

let notes = [ ...notesData ]
app.use(express.json())

app.get('/', (req, res) => {
  res.send('it works')
})

app.get('/notes', (req, res) => {
  res.status(200).json(notes)
})

app.get('/notes/:id', (req, res) => {
  const { id } = req.params
  const note = notes.find(n => n.id === id)
  if(note) {
    res.status(200).json(note)
  } else {
    res.statusMessage = "Note can't find" 
    res.status(404).end()
  }
})

app.delete('/notes/:id', (req, res) => {
  const { id } = req.params
  notes = notes.filter(note => note.id !== id)
  res.statusCode = 204
  res.end()
})

app.post('/notes', (req, res) => {
  const body = req.body
  if(!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  const id = generateId()
  const note = { 
    id, 
    content: body.content,
    date: new Date(),
    important: body.important || Math.random() > 0.5 ? true : false
  }
  notes.push(note)
  res.status(201).json(note)
})

export default app
