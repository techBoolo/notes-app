import { hashPassword } from '../utils/helpers.js'
import { createUser, getUser } from '../db/user.js'

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

export default {
  create, show
}
