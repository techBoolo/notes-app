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

export const getUserNotes = async (id) => {
  const stmt = `select notes._id, content, important, date, user, name, username 
    from users 
    inner join notes 
    on users._id = notes.user 
    where user = ?` 
  const [ notes ] = await pool.query(stmt, [id])

  return notes
}
