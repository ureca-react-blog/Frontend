import { useParams } from 'react-router-dom'
import css from './postdetailpage.module.css'
import { useEffect, useState } from 'react'
import { getPostDetail } from '../apis/postApi'
import DOMPurify from 'dompurify'
import { formatDate } from '../utils/features'

export const PostDetailPage = () => {
  const { postId } = useParams()
  const [post, setPost] = useState({})

  const cleanHtml = DOMPurify.sanitize(post?.content)
  console.log('clean', cleanHtml)

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const res = await getPostDetail(postId)
        setPost(res)
        console.log(res)
      } catch (error) {
        console.log('에러', error)
      }
    }
    fetchPostDetail()
  }, [postId])

  return (
    <main className={css.postdetailpage}>
      <h2>상세페이지</h2>
      <section>
        <div className={css.detail_img}>
          <img src={`${import.meta.env.VITE_BACK_URL}/${post.cover}`} alt={post.title} />
          <h3>블로그 제목</h3>
        </div>
        <div className={css.info}>
          <p>{post.author}</p>
          <p>{formatDate(post.createdAt)}</p>
        </div>
        <div className={css.summary}>{post.summary}</div>
        <div className={css.content} dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
      </section>
      <div className={css.btns}>
        <button>수정</button>
        <button>삭제</button>
        <button>목록으로 이동</button>
      </div>
      <section className={css.commentlist}>댓글 리스트</section>
    </main>
  )
}
