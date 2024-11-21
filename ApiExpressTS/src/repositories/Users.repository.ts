import db from '../../db/db'
import { Knex } from 'knex'

export const getUsersRepo = async () => {
  return await db.select({ email: 'email', role: 'role' }).from('user_auth')
}
export const getUserByEmailRepo = async (email: string) => {
  return await db.select('*').from('user_auth').where({ email })
}
export const getUserByParams = async (data: any) => {
  let hasEmail = data.hasOwnProperty('email')
  let hasFirstName = data.hasOwnProperty('first_name')
  let hasLastName = data.hasOwnProperty('last_name')
  if (hasEmail || hasFirstName || hasLastName) {
    let query_search =
      'SELECT a.email,a.role,first_name, last_name,date_birth FROM user_auth a Join user_data b on a.email=b.email '
    let check = false
    for (const property in data) {
      if (check) {
        query_search += ` And ${property === 'email' ? `a.` : ``}${property} = '${data[property]}'`
      } else {
        query_search += ` WHERE ${property === 'email' ? `a.` : ``}${property} = '${data[property]}'`
        check = true
      }
    }

    return await db('user_auth as a')
      .join('user_data as b', 'a.email', 'b.email')
      .select({
        email: 'a.email',
        role: 'role',
        first_name: 'first_name',
        last_name: 'last_name',
        date_birth: 'date_birth',
      })
      .where({
        ...(!!data.email && { 'a.email': data.email }),
        ...(!!data.first_name && { first_name: data.first_name }),
        ...(!!data.last_name && { last_name: data.last_name }),
      })
  }
}

export const getUserByParamsRepo = async (data: any) => {
  let query_search =
    'SELECT a.email,a.role,first_name, last_name,date_birth FROM user_auth a Join user_data b on a.email=b.email '
  let check = false
  for (const property in data) {
    if (check) {
      query_search += ` And ${property === 'email' ? `a.` : ``}${property} = '${data[property]}'`
    } else {
      query_search += ` WHERE ${property === 'email' ? `a.` : ``}${property} = '${data[property]}'`
      check = true
    }
  }

  return await db('user_auth as a')
    .join('user_data as b', 'a.email', 'b.email')
    .select({
      email: 'a.email',
      role: 'role',
      first_name: 'first_name',
      last_name: 'last_name',
      date_birth: 'date_birth',
    })
    .where({
      ...(!!data.email && { 'a.email': data.email }),
      ...(!!data.first_name && { first_name: data.first_name }),
      ...(!!data.last_name && { last_name: data.last_name }),
    })
}

export const addNewUserRepo = async (data: any) => {
  const { role, email, pin, first_name, last_name, date_birth } = data
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
