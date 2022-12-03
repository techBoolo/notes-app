import ErrorResponse from '../utils/errorResponse.js'

const routeNotFound = (req, res, next) => {
  const error = new ErrorResponse(404, 'Route not found.')
  next(error)
}

export default routeNotFound
