import http from 'http'

const PORT = process.env.PORT || 3001
import { notes } from './data/notes.js'

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(notes))
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
