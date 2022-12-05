import { getNotes, getNote, createNote, deleteNote, updateNoteImportance } from '../db/note.js'
import ErrorResponse from '../utils/errorResponse.js'
import('express-async-errors')

const index = async (req, res) => {
  const notes = await getNotes()
  res.status(200).json(notes)
}

const create = async (req, res, next) => {
    const body = req.body
    if(!body.content) {
       return next(new ErrorResponse(400, 'content missingg'))
    }
    const userData = { 
      content: body.content,
      date: new Date(),
      important: body.important || Math.random() > 0.5 ? true : false,
      user: 2
    }
    const note = await createNote(userData) 
    res.status(201).json(note)
}

const show = async (req, res, next) => {
    const { id } = req.params
    const note = await getNote(id)
    if(note) {
      res.status(200).json(note)
    } else {
      next(new ErrorResponse(404, "Note can't find"))
    }
}

const remove = async (req, res, next) => {
    const { id } = req.params
    const response = await deleteNote(id)
    if(response) {
      res.statusCode = 204
      res.end()
    } else {
      next(new ErrorResponse(404, 'note not found'))
    }
}

const update = async (req, res, next) => {
  const body = req.body
  const id = req.params.id
    const response = await updateNoteImportance(id, body.important)
    if(response) {
      res.status(200).json(response)
    } else {
      next(new ErrorResponse(404, "Note can't found."))
    }
}

export default {
  index, create,
  show, update,
  remove
}
