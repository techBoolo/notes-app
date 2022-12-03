import envConfig from '../utils/envConfig.js'

export default {
  host: envConfig.MYSQL_HOST,
  user: envConfig.MYSQL_USER,
  password: envConfig.MYSQL_PASSWORD,
  database: envConfig.MYSQL_DB_NAME
}

