import { createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserInfo {
  email: string
  first_name: string
  last_name: string
  date_birth: string
  role: string
}
const initialUserList: UserInfo[] = []
const UserListSlice = createSlice({
  name: 'userList',
  initialState: initialUserList,
  reducers: {
    setUserList(state, action: PayloadAction<UserInfo>) {
      const new_obj = action.payload

      if (state.length === 0) {
        return (state = [new_obj])
      } else {
        const projects = [...state]
        const updatedProjects = [...projects, new_obj]
        state = updatedProjects
        return state
      }
    },
    updUserByEmail(state, action: PayloadAction<UserInfo[]>) {
      const new_obj = action.payload[0]
      const index = current(state).findIndex(
        (item) => item.email === new_obj.email,
      )
      const updatedProjects = [
        ...state.slice(0, index),
        new_obj,
        ...state.slice(index + 1),
      ]
      state = updatedProjects
      return state
    },
    logOut: (state) => {
      state = []
      return state
    },
  },
})
export default UserListSlice
