import { PostCard } from '../components/PostCard'
import css from './postlistpage.module.css'
import { getPostList } from '../apis/postApi'
import { useEffect } from 'react'
import { useState } from 'react'

export const PostListPage = () => {
  const [postList, setPostList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchPostList = async () => {
      try {
        setLoading(true)
        setError(null)
        const postData = await getPostList()
        console.log('postData', postData)
        setPostList(postData)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setError('데이터 가져오는 중 오류 발생')
      }
    }
    fetchPostList()
  }, [])

  return (
    <main className={css.postlistpage}>
      <h2>리스트</h2>
      {error && <p className={css.error}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : postList.length === 0 ? (
        <p>게시물이 없습니다</p>
      ) : (
        <ul className={css.postlist}>
          {postList.map(post => (
            <li className={css.postcard} key={post._id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
