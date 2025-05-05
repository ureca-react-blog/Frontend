import axiosInstance from './axiosInstance.js'

export const getUserProfile = async () => {
  try {
    const res = await axiosInstance.get(`/profile`)
    return res.data
  } catch (err) {
    console.error(err)
    throw err // 에러를 호출한 곳으로 전달
  }
}

export const loginUser = async credentials => {
  const response = await axiosInstance.post(`/login`, credentials)
  return response.data
}

export const registerUser = async userData => {
  const response = await axiosInstance.post(`/register`, userData)
  return response.data
}

export const logoutUser = async () => {
  const response = await axiosInstance.post(`/logout`)
  return response.data
}
