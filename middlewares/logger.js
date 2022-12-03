import log from '../utils/log.js'

const logger = (req, res, next) => {
  log.info(req.method, req.url);
  next()
}

export default logger
