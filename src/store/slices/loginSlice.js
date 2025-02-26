import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.data = action.payload
    },
    
    logout: (state) => {
      state.data = null
    },
  },
})

export const { saveUser, logout } = loginSlice.actions

export default loginSlice.reducer