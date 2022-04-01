import React, { useMemo, useRef, useState } from 'react'
import PostFilter from './components/PostFilter'
import PostForm from './components/PostForm'
//import Counter from './components/Counter'
import Postitem from './components/PostItem'
import PostList from './components/PostList'
import MyButton from './components/UI/button/MyButton'
//import MyInput from './components/UI/input/MyInput'
import MyModal from './components/UI/MyModal/MyModal'
//import MySelect from './components/UI/select/MySelect'
import './styles/App.css'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'ggg' },
    { id: 2, title: 'Php', body: 'hhh' },
    { id: 3, title: 'C++', body: 'ooo' },
  ])

  const [filter, setFilter] = useState({ sort: '', query: '' })
  const [modal, setModal] = useState(false)

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    } return posts;
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query))
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  //отримуємо пост з дочернього елементу
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
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

      < PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постів" />
    </div >
  );
}

export default App;
