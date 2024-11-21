import env from 'dotenv'
import pkg from 'jsonwebtoken'
env.config()
const KEY: string = process.env.KEY || ''
export const createToken = (email: string) => {
  const { sign } = pkg
  return sign({ email }, KEY, { expiresIn: '1h' })
}
