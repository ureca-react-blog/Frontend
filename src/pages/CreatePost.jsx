import { useState } from 'react'
import QuillEditor from '../components/QuillEditor'
import css from './createpost.module.css'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../apis/postApi'

export const CreatePost = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [files, setFiles] = useState(null)
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleContentChange = value => {
    setContent(value)
  }

  const handleCreatePost = async e => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    console.log('제목:', title)

    // 데이터가 유효한지 검사 (존재 여부)
    if (!title || !summary || !content) {
      setIsSubmitting(false)
      setError('제목, 요약, 내용 필드를 모두 입력해주세요')
      return
    }
    // 업로드할 파일 정리하기 (입력된 데이터들을 하나의 객체로 만들기)
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    // 첨부 파일이 존재할 경우에만 등록하도록 하기
    if (files[0]) {
      // 파일 크기 검사 1024 * 1024 = 1MB
      // console.log('파일 크기:', files[0].size)
      // 파일 형식 검사 [image/png, image/jpeg, image/jpg]
      // console.log('파일 형식:', files[0].type)
      data.set('files', files[0])
    }

    try {
      setIsSubmitting(true)
      // 모아진 데이터를 서버로 전달하기
      const postData = await createPost(data)
      console.log('등록 성공', postData)
      setIsSubmitting(false)
      navigate('/')
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitting(false)
      setError('')
    }
  }

  return (
    <main className={css.createpost}>
      <h2>글쓰기</h2>
      <form className={css.writecon} onSubmit={handleCreatePost}>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="summary">요약 내용</label>
        <input
          type="text"
          id="summary"
          name="summary"
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <label htmlFor="file">첨부 파일</label>
        {/* accept를 이미지로 하면 이미지 관련 파일만 보여준다. */}
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={e => setFiles(e.target.files)} // input 타입이 파일이면 이벤트 타겟에 files로 접근해야 한다.
        />
        <label htmlFor="content">내용</label>
        <div className={css.editorWrapper}>
          <QuillEditor
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력해주세요"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '등록중...' : '등록'}
        </button>
      </form>
    </main>
  )
}
