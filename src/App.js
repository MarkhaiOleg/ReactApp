import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PostService from './components/API/PostServise'
import { useFetching } from './components/hooks/useFetching'
import { usePots } from './components/hooks/usePosts'
import PostFilter from './components/PostFilter'
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import MyButton from './components/UI/button/MyButton'
import Loader from './components/UI/loader/Loader'
import MyModal from './components/UI/MyModal/MyModal'
import './styles/App.css'
import { gatPagesArray, getPageCount } from './utils/pages'

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePots(posts, filter.sort, filter.query)
  let pagesArray = gatPagesArray(totalPages)

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const responce = await PostService.getAll(limit, page)
    setPosts(responce.data)
    const totalCount = responce.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, [])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  //отримуємо пост з дочернього елементу
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: '15px' }} onClick={() => setModal(true)}>
        Створити користувача
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />

      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />

      <div className="page__wrapper">
        {pagesArray.map(p =>
          <span
            onClick={() => changePage(p)}
            key={p}
            className={page === p ? 'page page__current' : 'page'}>
            {p}
          </span>
        )}
      </div>

      {postError &&
        <h1>Виникла помилка ${postError}</h1>}
      {isPostsLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постів" />
      }

    </div >
  );
}

export default App;
