import express from 'express'
import notesController from '../controllers/notes.js'

const router = express.Router()

router.route('/')
  .get(notesController.index)
  .post(notesController.create)
  
router.route('/:id')
  .get(notesController.show)
  .put(notesController.update)
  .delete(notesController.remove)

export default router
