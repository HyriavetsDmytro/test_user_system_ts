import { Knex } from 'knex'
import db from '../../db/db'

export const updatePw = async (email: string, password: string) => {
  return db('user_auth').where({ email }).update({ password })
}
export const addNewUser = async (data: any) => {
  const { role, email, pin, first_name, last_name, date_birth } = data

  const checkResult = await db.select('*').from('user_auth').where({ email })
  if (checkResult.length !== 0) {
    return
  }
  await db.transaction(async (trx: Knex.Transaction) => {
    await trx('user_auth').insert({
      email: email,
      password: pin,
      role: role,
    })
    await trx('user_data').insert({
      email: email,
      first_name: first_name,
      last_name: last_name,
      date_birth: date_birth,
    })
  })
}
export const getUserByEmail = async (email: string) => {
  return await db.select('*').from('user_auth').where({ email })
}
