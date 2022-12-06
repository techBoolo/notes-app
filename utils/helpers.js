import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import envConfig from './envConfig.js'
import ErrorResponse from './errorResponse.js'

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, +envConfig.saltRounds) 
}

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

export const generateJWT = async (payload) => {
  return await jwt.sign(payload, envConfig.JWT_KEY)
}
export const getTokenFrom = (req) => {
  const authentication = req.get('authentication')
  if(authentication && authentication.toLowerCase().startsWith('bearer')){
    return authentication.split(/\s+/)[1]
  } else {
    throw new ErrorResponse(400, "Please, Login or provide credential")
  }
}
export const verifyJWT = async (token) => {
  return await jwt.verify(token, envConfig.JWT_KEY) 
}
