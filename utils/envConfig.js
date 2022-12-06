import dotenv from 'dotenv'
dotenv.config()

const MYSQL_HOST = process.env.MYSQL_HOST
const MYSQL_USER = process.env.MYSQL_USER 
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME  
const saltRounds = process.env.saltRounds
const JWT_KEY = process.env.JWT_KEY

export default {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DB_NAME,
  saltRounds,
  JWT_KEY,
}


