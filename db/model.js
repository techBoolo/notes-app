import pool from './connect.js'

export async function getNotes() {
  const [ notes ] = await pool.query('select * from notes')
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
    insert into notes(content, important, date)
    values(?, ?, ?)
    `, [userData.content, userData.important, userData.date])
  const note = await getNote(result.insertId)
  return note
}

export async function deleteNote(id) {
  const [ result ] = await pool.query(`
    delete from notes
    where _id = ?
  `, [id])

  return result.affectedRows
}
  
export async function updateNoteImportance(id, important) {
  const [ result ]  = await pool.query(`
    update notes 
      set important = ? 
        where _id = ?
    `, [important, id])
  if(result.changedRows > 0) {
    return await getNote(id)
  } else {
    return null
  }
}
