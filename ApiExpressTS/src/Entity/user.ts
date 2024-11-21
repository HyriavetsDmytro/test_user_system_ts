import UserAuthInfo from './auth_user_info'

export default interface User extends UserAuthInfo {
  first_name: string
  last_name: string
  date_birth: Date
}
