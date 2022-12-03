import { getNotes, getNote, createNote, deleteNote, updateNoteImportance } from '../db/model.js'
import ErrorResponse from '../utils/errorResponse.js'

const index = async (req, res) => {
  const notes = await getNotes()
  res.status(200).json(notes)
}

const create = async (req, res, next) => {
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
}

const show = async (req, res, next) => {
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
}

const remove = async (req, res) => {
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
}

const update = async (req, res, next) => {
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
}

export default {
  index, create,
  show, update,
  remove
}
