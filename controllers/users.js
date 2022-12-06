import { hashPassword, comparePassword, generateJWT } from '../utils/helpers.js'
import { findUserByUsername, createUser, getUser, getUserNotes } from '../db/user.js'
import ErrorResponse from '../utils/errorResponse.js'

const create = async (req, res, next) => {
  const { password, ...rest } = req.body
  const hashedPassword = await hashPassword(password)
  const user = await createUser({ ...rest, password: hashedPassword })

  res.status(201).json(user)
}

const show = async (req, res, next) => {
  const { id } = req.params
  const user = await getUser(id)
  delete user.password

  res.status(200).json(user)
}

const notes = async (req, res, next) => {
  const { id } = req.params
  const notes = await getUserNotes(id)

  res.status(200).json(notes)
}

const login =  async (req, res, next) => {
  const { username, password } = req.body
  const user = await findUserByUsername(username)
  if(!username || !password) {
    const error = new ErrorResponse(404, 'username and password required to login')
    return next(error)
  }

  if(!user) {
    const error = new ErrorResponse(401, 'User does not exist')
    return next(error)
  }

  const response = await comparePassword(password, user.password)
  if(!response) {
    const error = new ErrorResponse(401, 'incorrect password')
    return next(error)
  }

  const payload = {
    id: user._id,
    name: user.name,
    username: user.username
  }

  const token = await generateJWT(payload)
  res.status(200).send({ ...payload, token })
}

export default {
  create, show,
  notes, login
}
