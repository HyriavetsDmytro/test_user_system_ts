import pkg from 'jsonwebtoken'
const { sign, verify } = pkg
import { compare } from 'bcrypt'
import env from 'dotenv'

env.config()

const KEY: string = process.env.KEY!

export function createJSONToken(email: string) {
  return sign({ email }, KEY, { expiresIn: '1h' })
}

export function validateJSONToken(token: string) {
  return verify(token, KEY)
}

export function isValidPassword(password: string, storedPassword: string) {
  return compare(password, storedPassword)
}
