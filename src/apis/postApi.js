import axios from 'axios'
axios.defaults.withCredentials = true // 모든 요청에 대해 withCredentials 설정
const API_URL = import.meta.env.VITE_BACK_URL

export const createPost = async postData => {
  // 백엔드에 POST 요청
  const response = await axios.post(`${API_URL}/postWrite`, postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// 파일 첨부할 때 header에 content 타입을 지정해야 하는데,
// axios에서는 headers에 넣지 않아도 인식하기 때문에 생략해도 된다.
//"Content-Type": "multipart/form-data",

// 리스트 요청
export const getPostList = async () => {
  const response = await axios.get(`${API_URL}/postList`)
  return response.data
}

// 게시글 요청
export const getPostDetail = async postId => {
  const response = await axios.get(`${API_URL}/postDetail/${postId}`)
  return response.data
}
