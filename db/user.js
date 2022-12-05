import pool from './connect.js'

export async function getUser(id) {
  const stmt = `select * from users where _id = ?`
  const [ user ] = await pool.query(stmt, [id])
  return user[0]
}

export async function createUser({ name, username, password}) {
  const stmt = `insert into users(name, username, password)
    values (?, ?, ?)`

  const [ result ] = await pool.query(stmt, [name, username, password])
  const user = await getUser(result.insertId)
  delete user.password
  return user
}
