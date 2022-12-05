import pool from './connect.js'

export async function getNotes() {
  const stmt = `select notes._id, content, important, date, user, name, username
    from notes
    inner join users
    on notes.user = users._id
  `
  const [ notes ] = await pool.query(stmt)
  return notes
}

export async function getNote(id) {
  const [ note ] = await pool.query(`
    select * from notes
    where _id = ?
    `, [id])
  return note[0]
}

export async function createNote(userData) {
  const [ result ] = await pool.query(`
    insert into notes(content, important, date, user)
    values(?, ?, ?, ?)
    `, [userData.content, userData.important, userData.date, userData.user])
  const note = await getNote(result.insertId)
  return note
}

export async function deleteNote(id) {
  const stmt = ` delete from notes
    where _id = ?
    `
  const [ result ] = await pool.query(stmt, [id])

  return result.affectedRows
}
  
export async function updateNoteImportance(id, important) {
  const stmt = `update notes 
      set important = ? 
      where _id = ?
    `
  const [ result ]  = await pool.query(stmt, [important, id])

  if(result.changedRows > 0) {
    return await getNote(id)
  } else {
    return null
  }
}
