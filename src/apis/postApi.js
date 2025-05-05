import axiosInstance from './axiosInstance.js'

// 파일 첨부할 때 header에 content 타입을 지정해야 하는데,
// axios에서는 headers에 넣지 않아도 인식하기 때문에 생략해도 된다.
//"Content-Type": "multipart/form-data",

export const createPost = async postData => {
  // 백엔드에 POST 요청
  const response = await axiosInstance.post(`/postWrite`, postData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// 리스트 요청
export const getPostList = async () => {
  const response = await axiosInstance.get(`/postList`)
  return response.data
}

// 게시글 요청
export const getPostDetail = async postId => {
  const response = await axiosInstance.get(`/postDetail/${postId}`)
  return response.data
}
