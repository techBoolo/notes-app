import http from 'http'
import app from './app.js'
import log from './utils/log.js'
import envConfig from './utils/envConfig.js'

const PORT = envConfig.PORT || 3001

const server = http.createServer(app)

server.listen(PORT, () => {
  log.info(`Server running on port ${PORT}`);
})
