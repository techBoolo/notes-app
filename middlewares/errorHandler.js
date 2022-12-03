const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500)
  res.statusMessage = error.statusMessage
  res.json({ message: error.message })
}

export default errorHandler
