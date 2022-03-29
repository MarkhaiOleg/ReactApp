import React, { useState } from 'react'
//import Counter from './components/Counter'
import Postitem from './components/PostItem'
import PostList from './components/PostList'
import MyButton from './components/UI/button/MyButton'
import MyInput from './components/UI/input/MyInput'
import './styles/App.css'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Javascript', body: 'Description' },
    { id: 2, title: 'Php', body: 'Description' },
    { id: 3, title: 'C++', body: 'Description' },
    { id: 4, title: 'Java', body: 'Description' },
    { id: 5, title: 'Python', body: 'Description' },
  ])

  const [title, setTitle] = useState('')

  const addNewPost = (e) => {
    e.preventDefault()
    console.log(title)
  }

  return (
    <div className="App">
      <form>
        {/*Керований компонент*/}
        <MyInput
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="Назва посту"
        />
        <MyInput
          type="text"
          placeholder="Опис посту"
        />
        <MyButton onClick={addNewPost}>Створити пост</MyButton>
      </form>
      <PostList posts={posts} title="Список постів" />
    </div >
  );
}

export default App;
