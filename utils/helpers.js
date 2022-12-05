import bcrypt from 'bcrypt'
import envConfig from './envConfig.js'

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, +envConfig.saltRounds) 
}
