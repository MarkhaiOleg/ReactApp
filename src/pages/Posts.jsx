
import React, { useEffect, useRef, useState } from 'react'
import PostService from '../components/API/PostServise'
import { useFetching } from '../components/hooks/useFetching'
import { usePots } from '../components/hooks/usePosts'
import PostFilter from '../components/PostFilter'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import MyButton from '../components/UI/button/MyButton'
import Loader from '../components/UI/loader/Loader'
import MyModal from '../components/UI/MyModal/MyModal'
import Pagination from '../components/UI/pagination/Pagination'
import { getPageCount } from '../utils/pages'
import '../styles/App.css'
import { useObserver } from '../components/hooks/useObserver'
import MySelect from '../components/UI/select/MySelect'


function Posts() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePots(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const responce = await PostService.getAll(limit, page)
        setPosts([...posts, ...responce.data])
        const totalCount = responce.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

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

            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Кількість елементів на сторінці'
                options={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                    { value: -1, name: 'показати всі' },
                ]}
            />


            {postError &&
                <h1>Виникла помилка ${postError}</h1>}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постів" />

            <div ref={lastElement} style={{ height: '20px' }}></div>

            {isPostsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}><Loader /></div>
            }

            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />

        </div >
    );
}

export default Posts;
