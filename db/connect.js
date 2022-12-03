import mysql from 'mysql2'
import config from './config.js'

const pool = mysql.createPool({
  connectionLimit: 5,
  ...config
}).promise()

export default pool
