import express from 'express'

const app = express()
import { notesData } from './data/notes.js'
let notes = [ ...notesData ]

app.get('/', (req, res) => {
  res.send('it works')
})

app.get('/notes', (req, res) => {
  res.status(200).json(notes)
})

app.get('/notes/:id', (req, res) => {
  const { id } = req.params
  const note = notes.find(n => n.id === Number(id))
  if(note) {
    res.status(200).json(note)
  } else {
    res.statusMessage = "Note can't find" 
    res.status(404).end()
  }
})

app.delete('/notes/:id', (req, res) => {
  const { id } = req.params
  notes = notes.filter(note => note.id !== Number(id))
  res.statusCode = 204
  res.end()
})

export default app
