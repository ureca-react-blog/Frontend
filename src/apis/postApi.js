import axios from 'axios'
axios.defaults.withCredentials = true // 모든 요청에 대해 withCredentials 설정
const API_URL = import.meta.env.VITE_BACK_URL

export const createPost = async postData => {
  // 백엔드에 POST 요청
  const response = await axios.post(`${API_URL}/postwrite`, postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}
// 파일 첨부할 때 header에 content 타입을 지정해야 한다.
