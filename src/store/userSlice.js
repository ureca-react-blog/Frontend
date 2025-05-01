import { createSlice } from '@reduxjs/toolkit'

export const user = createSlice({
  name: 'user',
  initialState: {
    user: '',
  },

  reducers: {
    setUserInfo: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUserInfo } = user.actions

// action.payload를 가져다주면 스토어에 있는 유저 정보 업데이트
