import express from 'express'
import usersController from '../controllers/users.js'

const router = express.Router()

router.route('/')
  .post(usersController.create)

router.route('/:id')
  .get(usersController.show)

export default router
