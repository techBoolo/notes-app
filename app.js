import express from 'express'

const app = express()
import { notes } from './data/notes.js'

app.get('/', (req, res) => {
  res.send('it works')
})

app.get('/notes', (req, res) => {
  res.status(200).json(notes)
})

export default app
